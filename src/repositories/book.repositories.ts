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
    },

    create: (data: Omit<Book, 'id' | 'isFavorite' | 'progress' | 'addedAt'>): Promise<Book> => {
        const newBook: Book = {
            ...data,
            id: crypto.randomUUID(),
            isFavorite: false,
            progress: data.status === 'read' ? 100 : 0,
            addedAt: new Date().toISOString()
        };
        mockBooks.push(newBook);
        return Promise.resolve(newBook);
    },

    update: (id: string, data: Partial<Omit<Book, 'id' | 'addedAt'>>): Promise<Book> => {
        const index = mockBooks.findIndex((book) => book.id === id);
        if (index === -1) {
            return Promise.reject(new Error('Book not found'));
        }
        mockBooks[index] = { ...mockBooks[index], ...data };
        return Promise.resolve(mockBooks[index]);
    },

    toggleFavorite: (id: string): Promise<Book> => {
        const index = mockBooks.findIndex((book) => book.id === id);
        if (index === -1) {
            return Promise.reject(new Error('Book not found'));
        }
        mockBooks[index] = {
            ...mockBooks[index],
            isFavorite: !mockBooks[index].isFavorite,
        };
        return Promise.resolve(mockBooks[index]);
    },

    delete: (id: string): Promise<void> => {
        const index = mockBooks.findIndex((book) => book.id === id);
        if (index === -1) {
            return Promise.reject(new Error('Book not found'));
        }
        mockBooks.splice(index, 1);
        return Promise.resolve();
    }
};