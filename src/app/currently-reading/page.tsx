'use client';

import { Shelf } from '@/components/Shelf';
import { useBooks } from '@/hooks/useBooks';

export default function CurrentlyReadingPage() {
  const { books, isLoading } = useBooks('currently-reading');

  if (isLoading) return <p className="text-sm text-muted-foreground">Loading...</p>;

  return <Shelf title="Currently Reading" books={books} emptyMessage="No books in progress yet." />;
}