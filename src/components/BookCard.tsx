import type { Book } from "@/types/book.types";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import Image from "next/image";
import { Progress } from "./ui/progress";

interface BookCardProps {
    book: Book;
}

export function BookCard({ book }: BookCardProps) {
    return (
        <Card className="overflow-hidden transition-shadow hover:shadow-md">
            <CardContent className="flex gap-4 p-4">
                <div className="relative h-32 w-24 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                    {book.coverUrl ? (
                        <Image 
                            src={book.coverUrl}
                            alt={book.title}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                            No cover
                        </div>
                    )}
                </div>

                <div className="flex flex-1 flex-col justify-between">
                    <div>
                        <h3 className="line-clamp-2 font-serif text-base font-semibold leading-tight">
                            {book.title}
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                            {book.author}
                        </p>
                        <Badge variant="secondary" className="mt-2">
                            {book.genre}
                        </Badge>
                    </div>

                    {book.status === 'currently-reading' && (
                        <div className="mt-3">
                            <div className="mb-1 flex items-center justify-between text-xs">
                                <span className="text-muted-foreground">Progress</span>
                                <span className="font-medium">{book.progress}%</span>
                            </div>
                            <Progress value={book.progress} className="h-1.5" />
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

