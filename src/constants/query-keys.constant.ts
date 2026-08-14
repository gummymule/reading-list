export const bookQueryKeys = {
    all: (search?: string) => ['books', 'all', search ?? ''] as const,
    byStatus: (status: string, search?: string) => ['books', 'status', status, search ?? ''] as const,
    favorites: (search?: string) => ['books', 'favorites', search ?? ''] as const
}

export const goalQueryKeys = {
    byYear: (year?: number) => ['reading-goal', year ?? 'current'] as const
}