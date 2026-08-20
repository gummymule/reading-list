'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Shelf } from '@/components/Shelf';
import { BookSearchInput } from '@/components/BookSearchInput';
import { BookSortSelect } from '@/components/BookSortSelect';
import { useBooks } from '@/hooks/useBooks';
import { BookGridSkeleton } from '@/components/BookGridSkeleton';

function CurrentlyReadingContent() {
  const searchParams = useSearchParams();
  const search = searchParams.get('search') ?? undefined;
  const sort = searchParams.get('sort') ?? undefined;

  const { books, isLoading, isError } = useBooks('currently-reading', search, sort);

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
          title="Currently Reading" 
          books={books} 
          emptyMessage="No books in progress yet."
          hasActiveSearch={!!search} 
        />
      )}
    </div>
  );
}

export default function CurrentlyReadingPage() {
  return (
    <Suspense fallback={<p className="text-sm text-muted-foreground">Loading...</p>}>
      <CurrentlyReadingContent />
    </Suspense>
  );
}