'use client';

import { Shelf } from '@/components/Shelf';
import { BookFormDialog } from '@/components/BookFormDialog';
import { useBooks } from '@/hooks/useBooks';
import { SetGoalDialog } from '@/components/SetGoalDialog';

export default function HomePage() {
  const { books, isLoading, isError } = useBooks('all');

  if (isLoading) return <p className="text-sm text-muted-foreground">Loading...</p>;
  if (isError) return <p className="text-sm text-destructive">Failed to load books</p>;

  return (
    <div>
      <div className="mb-4 flex justify-end gap-2">
        <SetGoalDialog />
        <BookFormDialog mode="create" />
      </div>
      <Shelf title="All Books" books={books} />
    </div>
  );
}