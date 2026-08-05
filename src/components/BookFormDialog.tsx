'use client';

import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Pencil } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { bookFormSchema, BookFormValues } from '@/constants/book-form.schema';
import { useCreateBook } from '@/hooks/useCreateBook';
import { useUpdateBook } from '@/hooks/useUpdateBook';
import { Book } from '@/types/book.types';

interface BookFormDialogProps {
  mode: 'create' | 'edit';
  book?: Book; // wajib diisi kalau mode 'edit'
}

export function BookFormDialog({ mode, book }: BookFormDialogProps) {
  const [open, setOpen] = useState(false);
  const { mutate: createBook, isPending: isCreating } = useCreateBook();
  const { mutate: updateBook, isPending: isUpdating } = useUpdateBook();

  const isPending = isCreating || isUpdating;

  const form = useForm<BookFormValues>({
    resolver: zodResolver(bookFormSchema),
    defaultValues: {
      title: book?.title ?? '',
      author: book?.author ?? '',
      genre: book?.genre ?? '',
      status: book?.status ?? 'want-to-read',
      coverUrl: book?.coverUrl ?? '',
      progress: book?.progress ?? 0,
    },
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const selectedStatus = form.watch('status');

  // Sinkronkan ulang default values kalau `book` berubah (misal buka dialog edit untuk buku berbeda)
  useEffect(() => {
    if (mode === 'edit' && book) {
      form.reset({
        title: book.title,
        author: book.author,
        genre: book.genre,
        status: book.status,
        coverUrl: book.coverUrl ?? '',
        progress: book.progress,
      });
    }
  }, [book, mode, form]);

  const onSubmit = (values: BookFormValues) => {
    const payload = { 
      ...values, 
      coverUrl: values.coverUrl || undefined,
      progress: 
        values.status === 'read'
          ? 100
          : values.status === 'want-to-read'
            ? 0
            : values.progress ?? 0,
    };

    if (mode === 'edit' && book) {
      updateBook(
        { id: book.id, data: payload },
        { onSuccess: () => setOpen(false) }
      );
    } else {
      createBook(payload, {
        onSuccess: () => {
          form.reset();
          setOpen(false);
        },
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          mode === 'create' ? (
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Book
            </Button>
          ) : (
            <Button variant="ghost" size="icon-sm" aria-label="Edit book">
              <Pencil className="h-4 w-4" />
            </Button>
          )
        }
      />

      <DialogContent className="flex max-h-[85vh] flex-col sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif">
            {mode === 'edit' ? 'Edit Book' : 'Add a New Book'}
          </DialogTitle>
        </DialogHeader>

        <form
          id={`book-form-${mode}`}
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex-1 overflow-y-auto px-1"
        >
          <FieldGroup>
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={`${mode}-title`}>Title</FieldLabel>
                  <Input
                    {...field}
                    id={`${mode}-title`}
                    placeholder="Project Hail Mary"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="author"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={`${mode}-author`}>Author</FieldLabel>
                  <Input
                    {...field}
                    id={`${mode}-author`}
                    placeholder="Andy Weir"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="genre"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={`${mode}-genre`}>Genre</FieldLabel>
                  <Input
                    {...field}
                    id={`${mode}-genre`}
                    placeholder="Science Fiction"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="status"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={`${mode}-status`}>Status</FieldLabel>
                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger id={`${mode}-status`} aria-invalid={fieldState.invalid}>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="want-to-read">Want to Read</SelectItem>
                      <SelectItem value="currently-reading">Currently Reading</SelectItem>
                      <SelectItem value="read">Read</SelectItem>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {selectedStatus === 'currently-reading' && (
              <Controller
                name="progress"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={`${mode}-progress`}>Progress (%)</FieldLabel>
                    <Input
                      {...field}
                      value={field.value ?? ''}
                      id={`${mode}-progress`}
                      type="number"
                      min={0}
                      max={100}
                      placeholder="0"
                      aria-invalid={fieldState.invalid}
                      onChange={(e) => {
                        const rawValue = e.target.value;
                        field.onChange(rawValue === '' ? undefined : Number(rawValue));
                      }}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            )}

            <Controller
              name="coverUrl"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={`${mode}-coverUrl`}>Cover URL (optional)</FieldLabel>
                  <Input
                    {...field}
                    id={`${mode}-coverUrl`}
                    placeholder="https://..."
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
        </form>

        <DialogFooter>
          <Button type="submit" form={`book-form-${mode}`} disabled={isPending}>
            {isPending ? 'Saving...' : mode === 'edit' ? 'Update Book' : 'Save Book'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}