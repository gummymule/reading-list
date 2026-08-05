'use client';

import { Shelf } from '@/components/Shelf';
import { useBooks } from '@/hooks/useBooks';

export default function CurrentlyReadingPage() {
  const { books, isLoading, isError } = useBooks('currently-reading');

  if (isLoading) return <p className="text-sm text-muted-foreground">Loading...</p>;
  if (isError) return <p className="text-sm text-destructive">Failed to load books</p>;

  return <Shelf title="Currently Reading" books={books} emptyMessage="No books in progress yet." />;
}