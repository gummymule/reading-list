import { useMutation, useQueryClient } from '@tanstack/react-query';
import { bookRepository } from '@/repositories/book.repositories';
import type { Book } from '@/types/book.types';

interface UpdateBookParams {
    id: string;
    data: Partial<Omit<Book, 'id' | 'addedAt'>>;
}

export function useUpdateBook() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: UpdateBookParams) => bookRepository.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['books'] });
            queryClient.invalidateQueries({ queryKey: ['reading-goal'] });
        }
    })
}