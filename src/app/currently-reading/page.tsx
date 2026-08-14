'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Shelf } from '@/components/Shelf';
import { BookSearchInput } from '@/components/BookSearchInput';
import { useBooks } from '@/hooks/useBooks';

function CurrentlyReadingContent() {
  const searchParams = useSearchParams();
  const search = searchParams.get('search') ?? undefined;

  const { books, isLoading, isError } = useBooks('currently-reading', search);

  if (isLoading) return <p className="text-sm text-muted-foreground">Loading...</p>;
  if (isError) return <p className="text-sm text-destructive">Failed to load books</p>;

  return (
    <div>
      <div className="mb-4">
        <BookSearchInput />
      </div>
      <Shelf
        title="Currently Reading"
        books={books}
        emptyMessage="No books in progress yet."
      />
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