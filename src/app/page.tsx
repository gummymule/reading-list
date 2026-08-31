'use client';

import { Shelf } from '@/components/Shelf';
import { BookFormDialog } from '@/components/BookFormDialog';
import { useBooks } from '@/hooks/useBooks';
import { BookSearchInput } from '@/components/BookSearchInput';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { BookSortSelect } from '@/components/BookSortSelect';
import { BookGridSkeleton } from '@/components/BookGridSkeleton';
import { UserMenu } from '@/components/UserMenu';

function HomePageContent() {
  const searchParams = useSearchParams();
  const search = searchParams.get('search') ?? undefined;
  const sort = searchParams.get('sort') ?? undefined;

  const { books, isLoading, isError } = useBooks('all', search, sort);

  return (
    <div>
      <div className="mb-4 flex justify-end gap-2">
        <BookSearchInput />
        <BookSortSelect />
        <BookFormDialog mode="create" />
        <div className="ml-2">
          <UserMenu />
        </div>
      </div>

      {isLoading ? (
        <BookGridSkeleton />
      ) : isError ? (
        <p className="text-sm text-destructive">Failed to load books</p>
      ) : (
        <Shelf title="All Books" books={books} hasActiveSearch={!!search} />
      )}
    </div>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={<p className="text-sm text-muted-foreground">Loading...</p>}>
      <HomePageContent />
    </Suspense>
  );
}