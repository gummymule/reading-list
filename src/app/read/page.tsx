'use client';

import { Shelf } from '@/components/Shelf';
import { useBooks } from '@/hooks/useBooks';

export default function ReadPage() {
  const { books, isLoading } = useBooks('read');

  if (isLoading) return <p className="text-sm text-muted-foreground">Loading...</p>;

  return <Shelf title="Read" books={books} emptyMessage="No books in your read list yet." />;
}