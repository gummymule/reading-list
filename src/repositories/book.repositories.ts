import type { Book, ReadingStatus } from "@/types/book.types";
import { apiClient } from "@/lib/api-client";

export const bookRepository = {
    getAll: (search? : string): Promise<Book[]> => {
        return apiClient.get<Book[]>(search 
            ? `/books?search=${encodeURIComponent(search)}` 
            : '/books'
        );
    },

    getByStatus: (status: ReadingStatus, search?: string): Promise<Book[]> => {
        return apiClient.get<Book[]>(search 
            ? `/books?status=${status}&search=${encodeURIComponent(search)}` 
            : `/books?status=${status}`
        );
    },

    getFavorites: (search?: string): Promise<Book[]> => {
        return apiClient.get<Book[]>(search 
            ? `/books?favorite=true&search=${encodeURIComponent(search)}` 
            : '/books?favorite=true'
        );
    },

    create: (data: Omit<Book, 'id' | 'isFavorite' | 'addedAt'>): Promise<Book> => {
        return apiClient.post<Book>('/books', data);
    },

    update: (id: string, data: Partial<Omit<Book, 'id' | 'addedAt'>>): Promise<Book> => {
        return apiClient.patch<Book>(`/books/${id}`, data);
    },

    toggleFavorite: (id: string): Promise<Book> => {
        return apiClient.patch<Book>(`/books/${id}/favorite`, {});
    },

    delete: (id: string): Promise<void> => {
        return apiClient.delete<void>(`/books/${id}`);
    }
};