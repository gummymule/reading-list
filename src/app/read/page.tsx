'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Shelf } from '@/components/Shelf';
import { BookSearchInput } from '@/components/BookSearchInput';
import { BookSortSelect } from '@/components/BookSortSelect';
import { useBooks } from '@/hooks/useBooks';
import { BookGridSkeleton } from '@/components/BookGridSkeleton';

function ReadContent() {
  const searchParams = useSearchParams();
  const search = searchParams.get('search') ?? undefined;
  const sort = searchParams.get('sort') ?? undefined;

  const { books, isLoading, isError } = useBooks('read', search, sort);

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
          title="Read" 
          books={books} 
          emptyMessage="You haven't finished any books yet."
          hasActiveSearch={!!search} 
        />
      )}
    </div>
  );
}

export default function ReadPage() {
  return (
    <Suspense fallback={<p className="text-sm text-muted-foreground">Loading...</p>}>
      <ReadContent />
    </Suspense>
  );
}