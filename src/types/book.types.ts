export type ReadingStatus = 'want-to-read' | 'currently-reading' | 'read';

export interface Book {
    id: string;
    title: string;
    author: string;
    genre: string;
    coverUrl?: string;
    status: ReadingStatus;
    progress: number;
    isFavorite: boolean;
    addedAt: string;
}

export interface ReadingGoal {
    year: number;
    target: number;
    current: number;
}