import type { ReadingStatus } from "@/types/book.types";
import { bookRepository } from "@/repositories/book.repositories";
import { useQuery } from "@tanstack/react-query";
import { bookQueryKeys } from "@/constants/query-keys.constant";

type BookFilter = ReadingStatus | 'favorites' | 'all';

export function useBooks(filter: BookFilter = 'all') {
    const query = useQuery({
        queryKey: 
            filter === 'all'
                ? bookQueryKeys.all
                : filter === 'favorites'
                    ? bookQueryKeys.favorites()
                    : bookQueryKeys.byStatus(filter),
        queryFn: () => {
            if (filter === 'all') return bookRepository.getAll();
            if (filter === 'favorites') return bookRepository.getFavorites();
            return bookRepository.getByStatus(filter);
        }
    })
    return { 
        books: query.data ?? [],
        isLoading: query.isLoading,
        isError: query.isError,
        error: query.error 
    };
}