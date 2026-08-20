import type { Book, ReadingStatus } from "@/types/book.types";
import { apiClient } from "@/lib/api-client";

export const bookRepository = {
    getAll: (search?: string, sort?: string): Promise<Book[]> =>
        apiClient.get<Book[]>(`/books${buildQuery({ search, sort })}`),

    getByStatus: (status: ReadingStatus, search?: string, sort?: string): Promise<Book[]> =>
        apiClient.get<Book[]>(`/books${buildQuery({ status, search, sort })}`),

    getFavorites: (search?: string, sort?: string): Promise<Book[]> =>
        apiClient.get<Book[]>(`/books${buildQuery({ favorite: 'true', search, sort })}`),

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

function buildQuery(params: Record<string, string | undefined>): string {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
        if (value) searchParams.set(key, value);
    })
    const query = searchParams.toString();
    return query ? `?${query}` : '';
}