import type { Book, ReadingStatus } from "@/types/book.types";
import { useState, useEffect } from "react";
import { bookRepository } from "@/repositories/book.repositories";

type BookFilter = ReadingStatus | 'favorites' | 'all';

export function useBooks(filter: BookFilter = 'all') {
    const [books, setBooks] = useState<Book[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isCancelled = false;

        const fetchBooks = async () => {
            setIsLoading(true);

            let result: Book[];
            if (filter === 'all') {
                result = await bookRepository.getAll()
            } else if (filter === 'favorites') {
                result = await bookRepository.getFavorites();
            } else {
                result = await bookRepository.getByStatus(filter);
            }
            if (!isCancelled) {
                setBooks(result);
                setIsLoading(false);
            }
        };
        fetchBooks();

        return () => {
            isCancelled = true;
        };
    }, [filter])

    return { books, isLoading };
}