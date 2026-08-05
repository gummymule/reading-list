// src/features/books/components/BookCard.tsx

import Image from 'next/image';
import { Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { Book } from '@/types/book.types';
import { useToggleFavorite } from '@/hooks/useToggleFavorite';
import { BookFormDialog } from '@/components/BookFormDialog';
import { DeleteBookAlert } from '@/components/DeleteBookAlert';

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  const { mutate: toggleFavorite, isPending } = useToggleFavorite();

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-md">
      <CardContent className="flex gap-4 p-4">
        {/* Cover + favorite overlay */}
        <div className="relative h-32 w-24 flex-shrink-0 overflow-hidden rounded-md bg-muted">
          {book.coverUrl ? (
            <Image src={book.coverUrl} alt={book.title} fill className="object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
              No Cover
            </div>
          )}

          <Button
            variant="ghost"
            size="icon-xs"
            aria-label={book.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            disabled={isPending}
            onClick={() => toggleFavorite(book.id)}
            className="absolute top-1 right-1 bg-background/70 backdrop-blur-sm hover:bg-background/90"
          >
            <Heart
              className={cn(
                'h-3.5 w-3.5',
                book.isFavorite && 'fill-destructive text-destructive'
              )}
            />
          </Button>
        </div>

        {/* Info */}
        <div className="flex flex-1 flex-col">
          <h3 className="line-clamp-2 font-serif text-base font-semibold leading-tight">
            {book.title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{book.author}</p>
          <Badge variant="secondary" className="mt-2 w-fit">
            {book.genre}
          </Badge>

          {book.status === 'currently-reading' && (
            <div className="mt-3">
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{book.progress}%</span>
              </div>
              <Progress value={book.progress} className="h-1.5" />
            </div>
          )}

          {/* Edit & delete — nempel langsung di bawah konten, tanpa footer terpisah */}
          <div className="mt-auto flex justify-end gap-0.5 pt-2">
            <BookFormDialog mode="edit" book={book} />
            <DeleteBookAlert book={book} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}