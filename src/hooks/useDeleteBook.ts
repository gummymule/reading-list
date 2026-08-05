import { useMutation, useQueryClient } from '@tanstack/react-query';
import { bookRepository } from '@/repositories/book.repositories';

export function useDeleteBook() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => bookRepository.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['books'] });
        }
    });
}