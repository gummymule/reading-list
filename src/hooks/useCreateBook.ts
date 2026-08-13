import { useMutation, useQueryClient } from '@tanstack/react-query';
import { bookRepository } from '@/repositories/book.repositories';

export function useCreateBook() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: bookRepository.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['books'] });
            queryClient.invalidateQueries({ queryKey: ['reading-goal'] });
        }
    })
}