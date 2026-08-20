'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Shelf } from '@/components/Shelf';
import { BookSearchInput } from '@/components/BookSearchInput';
import { BookSortSelect } from '@/components/BookSortSelect';
import { useBooks } from '@/hooks/useBooks';
import { BookGridSkeleton } from '@/components/BookGridSkeleton';

function FavoritesContent() {
  const searchParams = useSearchParams();
  const search = searchParams.get('search') ?? undefined;
  const sort = searchParams.get('sort') ?? undefined;

  const { books, isLoading, isError } = useBooks('favorites', search, sort);

  return (
    <div>
      <div className="mb-4 flex justify-end gap-2">
        <BookSearchInput />
        <BookSortSelect />
      </div>
      {isLoading ? (
        <BookGridSkeleton />
      ) : isError ? (
        <p className="text-sm text-destructive">Failed to load books</p>
      ) : (
        <Shelf 
          title="Favorites" 
          books={books} 
          emptyMessage="No favorites yet."
          hasActiveSearch={!!search} 
        />
      )}
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