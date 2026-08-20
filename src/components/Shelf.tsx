import type { Book } from "@/types/book.types";
import { BookGrid } from "./BookGrid";

interface ShelfProps {
    title: string;
    books: Book[];
    emptyMessage?: string;
    hasActiveSearch?: boolean;
}

export function Shelf({ title, books, emptyMessage, hasActiveSearch }: ShelfProps) {
    return (
        <section>
            <div className="mb-6 flex items-baseline gap-3">
                <h1 className="font-serif text-3xl font-semibold">
                    {title}
                </h1>
                <span className="text-sm text-muted-foreground">
                    {books.length} books
                </span>
            </div>
            <BookGrid 
                books={books} 
                emptyMessage={emptyMessage} 
                hasActiveSearch={hasActiveSearch}
            />
        </section>
    )
}