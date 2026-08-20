export const bookQueryKeys = {
    all: (search?: string, sort?: string) => 
        ['books', 'all', search ?? '', sort ?? ''] as const,
    byStatus: (status: string, search?: string, sort?: string) => 
        ['books', 'status', status, search ?? '', sort ?? ''] as const,
    favorites: (search?: string, sort?: string) => 
        ['books', 'favorites', search ?? '', sort ?? ''] as const
}

export const goalQueryKeys = {
    byYear: (year?: number) => ['reading-goal', year ?? 'current'] as const
}