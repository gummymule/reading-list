// src/features/books/constants/book-form.schema.ts

import { z } from 'zod';

export const bookFormSchema = z
  .object({
    title: z.string().min(1, 'Title is required').max(200),
    author: z.string().min(1, 'Author is required').max(100),
    genre: z.string().min(1, 'Genre is required'),
    status: z.enum(['want-to-read', 'currently-reading', 'read']),
    coverUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
    progress: z
      .number()
      .min(0, 'Progress must be at least 0')
      .max(100, 'Progress cannot exceed 100')
      .optional(),
  })
  .refine(
    (data) => {
      if (data.status === 'currently-reading') {
        return data.progress !== undefined && data.progress !== null;
      }
      return true;
    },
    {
      message: 'Progress is required when status is currently-reading',
      path: ['progress'],
    }
  );

export type BookFormValues = z.infer<typeof bookFormSchema>;