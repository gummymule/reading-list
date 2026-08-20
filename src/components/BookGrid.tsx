import type { Book } from "@/types/book.types";
import { BookCard } from "./BookCard";
import { EmptyState } from "./EmptyState";

interface BookGridProps {
    books: Book[];
    emptyMessage?: string;
    hasActiveSearch?: boolean;
}

export function BookGrid({ books, emptyMessage, hasActiveSearch }: BookGridProps) {
    if (books.length === 0) {
        return hasActiveSearch ? (
            <EmptyState 
                variant="no-results"
                title="No matching books"
                description="Try a different search term or clear your filters"
            />
        ) : (
            <EmptyState 
                variant="no-data"
                title="No books here yet"
                description={emptyMessage ?? 'Books you add will appear here.'}
            />
        );
    }

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => (
                <BookCard key={book.id} book={book} />
            ))}
        </div>
    )
}