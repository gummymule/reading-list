import { BookCardSkeleton } from "./BookCardSkeleton";

export function BookGridSkeleton({ count = 6 }: { count?: number }) {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: count }).map((_, index) => (
                <BookCardSkeleton key={index} />
            ))}
        </div>
    );
}