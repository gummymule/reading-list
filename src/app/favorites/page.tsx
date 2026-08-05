'use client';

import { Shelf } from '@/components/Shelf';
import { useBooks } from '@/hooks/useBooks';

export default function FavoritesPage() {
  const { books, isLoading, isError } = useBooks('favorites');

  if (isLoading) return <p className="text-sm text-muted-foreground">Loading...</p>;
  if (isError) return <p className="text-sm text-destructive">Failed to load books</p>;
  
  return <Shelf title="Favorites" books={books} emptyMessage="No favorite books yet." />;
}