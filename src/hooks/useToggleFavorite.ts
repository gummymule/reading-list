import { useMutation, useQueryClient } from '@tanstack/react-query';
import { bookRepository } from '@/repositories/book.repositories';
import type { Book } from '@/types/book.types';

export function useToggleFavorite() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => bookRepository.toggleFavorite(id),
        onMutate: async (id: string) => {
            await queryClient.cancelQueries({ queryKey: ['books'] });

            const previousQueries = queryClient.getQueriesData<Book[]>({ queryKey: ['books'] });

            queryClient.setQueriesData<Book[]>({ queryKey: ['books'] }, (old) => 
                old?.map((book) => 
                    book.id === id ? { ...book, isFavorite: !book.isFavorite } : book
                )
            );

            return { previousQueries };
        },
        onError: (_err, _id, context) => {
            context?.previousQueries.forEach(([queryKey, data]) => {
                queryClient.setQueryData(queryKey, data);
            });
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['books'] });
        }
    })
}