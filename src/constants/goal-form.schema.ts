import { z } from 'zod';

export const goalFormSchema = z.object({
    target: z
        .number()
        .int('Target must be a whole number')
        .min(1, 'Target must be at least 1 book')
        .max(999, 'Target seems too high'),
});

export type GoalFormValues = z.infer<typeof goalFormSchema>;