export const bookQueryKeys = {
    all: ['books'] as const,
    byStatus: (status: string) => ['books', 'status', status] as const,
    favorites: () => ['books', 'favorites'] as const
}