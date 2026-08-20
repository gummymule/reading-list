import type { ReadingStatus } from "@/types/book.types";
import { bookRepository } from "@/repositories/book.repositories";
import { useQuery } from "@tanstack/react-query";
import { bookQueryKeys } from "@/constants/query-keys.constant";

type BookFilter = ReadingStatus | 'favorites' | 'all';

export function useBooks(filter: BookFilter = 'all', search?: string, sort?: string) {
    const query = useQuery({
        queryKey:
            filter === 'all'
                ? bookQueryKeys.all(search, sort)
                : filter === 'favorites'
                    ? bookQueryKeys.favorites(search, sort)
                    : bookQueryKeys.byStatus(filter, search, sort),
        queryFn: () => {
            if (filter === 'all') return bookRepository.getAll(search, sort);
            if (filter === 'favorites') return bookRepository.getFavorites(search, sort);
            return bookRepository.getByStatus(filter, search, sort);
        }
    })
    return { 
        books: query.data ?? [],
        isLoading: query.isLoading,
        isError: query.isError,
        error: query.error 
    };
}