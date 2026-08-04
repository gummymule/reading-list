import type { Book } from "@/types/book.types";
import { BookCard } from "./BookCard";

interface BookGridProps {
    books: Book[];
    emptyMessage?: string;
}

export function BookGrid({ books, emptyMessage = 'No books found.'}: BookGridProps) {
    if (books.length === 0) {
        return (
            <div className="flex h-40 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
                {emptyMessage}
            </div>
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