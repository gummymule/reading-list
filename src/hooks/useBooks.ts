import type { ReadingStatus } from "@/types/book.types";
import { bookRepository } from "@/repositories/book.repositories";
import { useQuery } from "@tanstack/react-query";
import { bookQueryKeys } from "@/constants/query-keys.constant";

type BookFilter = ReadingStatus | 'favorites' | 'all';

export function useBooks(filter: BookFilter = 'all', search?: string) {
    const query = useQuery({
        queryKey:
            filter === 'all'
                ? bookQueryKeys.all(search)
                : filter === 'favorites'
                    ? bookQueryKeys.favorites(search)
                    : bookQueryKeys.byStatus(filter, search),
        queryFn: () => {
            if (filter === 'all') return bookRepository.getAll(search);
            if (filter === 'favorites') return bookRepository.getFavorites(search);
            return bookRepository.getByStatus(filter, search);
        }
    })
    return { 
        books: query.data ?? [],
        isLoading: query.isLoading,
        isError: query.isError,
        error: query.error 
    };
}