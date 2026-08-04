import type { Book } from "@/types/book.types";
import { mockBooks } from "@/data/books.mock";

export const bookRepository = {
    getAll: (): Promise<Book[]> => {
        return Promise.resolve(mockBooks);
    },
    getByStatus: (status: Book['status']): Promise<Book[]> => {
        const filteredBooks = mockBooks.filter(book => book.status === status);
        return Promise.resolve(filteredBooks);
    },
    getFavorites: (): Promise<Book[]> => {
        return Promise.resolve(mockBooks.filter(book => book.isFavorite));
    }
};