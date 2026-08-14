'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Shelf } from '@/components/Shelf';
import { BookSearchInput } from '@/components/BookSearchInput';
import { useBooks } from '@/hooks/useBooks';

function WantToReadContent() {
  const searchParams = useSearchParams();
  const search = searchParams.get('search') ?? undefined;

  const { books, isLoading, isError } = useBooks('want-to-read', search);

  if (isLoading) return <p className="text-sm text-muted-foreground">Loading...</p>;
  if (isError) return <p className="text-sm text-destructive">Failed to load books</p>;

  return (
    <div>
      <div className="mb-4">
        <BookSearchInput />
      </div>
      <Shelf title="Want to Read" books={books} emptyMessage="Your want-to-read list is empty." />
    </div>
  );
}

export default function WantToReadPage() {
  return (
    <Suspense fallback={<p className="text-sm text-muted-foreground">Loading...</p>}>
      <WantToReadContent />
    </Suspense>
  );
}