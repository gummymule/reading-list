export const bookQueryKeys = {
    all: ['books'] as const,
    byStatus: (status: string) => ['books', 'status', status] as const,
    favorites: () => ['books', 'favorites'] as const
}

export const goalQueryKeys = {
    byYear: (year?: number) => ['reading-goal', year ?? 'current'] as const
}