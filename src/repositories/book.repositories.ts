import type { Book, ReadingStatus } from "@/types/book.types";
import { apiClient } from "@/lib/api-client";

export const bookRepository = {
    getAll: (): Promise<Book[]> => {
        return apiClient.get<Book[]>('/books');
    },

    getByStatus: (status: ReadingStatus): Promise<Book[]> => {
        return apiClient.get<Book[]>(`/books?status=${status}`);
    },

    getFavorites: (): Promise<Book[]> => {
        return apiClient.get<Book[]>('/books?favorite=true');
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