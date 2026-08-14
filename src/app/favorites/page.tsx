'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Shelf } from '@/components/Shelf';
import { BookSearchInput } from '@/components/BookSearchInput';
import { useBooks } from '@/hooks/useBooks';

function FavoritesContent() {
  const searchParams = useSearchParams();
  const search = searchParams.get('search') ?? undefined;

  const { books, isLoading, isError } = useBooks('favorites', search);

  if (isLoading) return <p className="text-sm text-muted-foreground">Loading...</p>;
  if (isError) return <p className="text-sm text-destructive">Failed to load books</p>;

  return (
    <div>
      <div className="mb-4">
        <BookSearchInput />
      </div>
      <Shelf title="Favorites" books={books} emptyMessage="No favorites yet." />
    </div>
  );
}

export default function FavoritesPage() {
  return (
    <Suspense fallback={<p className="text-sm text-muted-foreground">Loading...</p>}>
      <FavoritesContent />
    </Suspense>
  );
}