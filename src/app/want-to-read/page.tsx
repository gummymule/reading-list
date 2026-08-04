'use client';

import { Shelf } from '@/components/Shelf';
import { useBooks } from '@/hooks/useBooks';

export default function WantToReadPage() {
  const { books, isLoading } = useBooks('want-to-read');

  if (isLoading) return <p className="text-sm text-muted-foreground">Loading...</p>;

  return <Shelf title="Want to Read" books={books} emptyMessage="No books in your want to read list yet." />;
}