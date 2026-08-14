'use client';

import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import { useDeleteBook } from '../hooks/useDeleteBook';
import { Book } from '../types/book.types';
import { toast } from 'sonner';

interface DeleteBookAlertProps {
  book: Book;
}

export function DeleteBookAlert({ book }: DeleteBookAlertProps) {
  const { mutate: deleteBook, isPending } = useDeleteBook();

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button
            variant="ghost"
            size="icon-xs"
            aria-label="Delete book"
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        }
      />

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete &quot;{book.title}&quot;?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This book will be permanently removed from
            your library.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            render={<Button variant="outline">Cancel</Button>}
          />
          <AlertDialogAction
            render={
              <Button
                variant="destructive"
                disabled={isPending}
                onClick={() => deleteBook(book.id, {
                  onSuccess: () => {
                    toast.success('Book deleted', {
                      description: `"${book.title}" has been remove from yoour library`
                    });
                  },
                  onError: () => {
                    toast.error('Failed to delete book');
                  }
                })}
              >
                {isPending ? 'Deleting...' : 'Delete'}
              </Button>
            }
          />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}