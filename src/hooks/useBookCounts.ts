import { bookQueryKeys } from "@/constants/query-keys.constant";
import { useQuery } from "@tanstack/react-query";
import { bookRepository } from "@/repositories/book.repositories";

export function useBookCounts() {
    const { data: books = [], isLoading } = useQuery({
        queryKey: bookQueryKeys.all(),
        queryFn: () => bookRepository.getAll(),
    });

    return {
        isLoading,
        counts: {
            all: books.length,
            'currently-reading': books.filter(book => book.status === 'currently-reading').length,
            'want-to-read': books.filter(book => book.status === 'want-to-read').length,
            read: books.filter(book => book.status === 'read').length,
            favorites: books.filter(book => book.isFavorite).length
        },
    };
}