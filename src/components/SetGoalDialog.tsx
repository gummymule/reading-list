'use client';

import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Target } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle, 
    DialogTrigger, 
    DialogFooter,
} from '@/components/ui/dialog';
import { Field, FieldError, FieldLabel, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import { goalFormSchema, GoalFormValues } from '@/constants/goal-form.schema';
import { useReadingGoal } from '@/hooks/useReadingGoal';
import { useUpdateGoal } from '@/hooks/useUpdateGoal';

export function SetGoalDialog() {
    const [open, setOpen] = useState(false);
    const { goal } = useReadingGoal();
    const { mutate: updateGoal, isPending } = useUpdateGoal();

    const form = useForm<GoalFormValues>({
        resolver: zodResolver(goalFormSchema),
        defaultValues: {
            target: goal?.target ?? 12,
        },
    });

    useEffect(() => {
        if (goal) {
            form.reset({
                target: goal.target
            })
        }
    },[goal, form]);

    const onSubmit = (values: GoalFormValues) => {
        const year = goal?.year ?? new Date().getFullYear();
        updateGoal(
            { year, target: values.target },
            { onSuccess: () => setOpen(false)}
        );
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger 
                render={
                    <Button variant="outline" className="gap-2">
                        <Target className="h-4 w-4" />
                        Set Target
                    </Button>
                }
            />
            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle className="font-serif">
                        Set Reading Target
                    </DialogTitle>
                </DialogHeader>

                <form id="goal-form" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller
                            name="target"
                            control={form.control}
                            render={({ field, fieldState}) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="goal-target">
                                        Books to read in {goal?.year ?? new Date().getFullYear()}
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        value={field.value ?? ''}
                                        id="goal-target"
                                        inputMode="numeric"
                                        placeholder="Enter number of books"
                                        aria-invalid={fieldState.invalid}
                                        onChange={(e) => {
                                            const digitsOnly = e.target.value.replace(/\D/g, '');
                                            field.onChange(digitsOnly === '' ? undefined : Number(digitsOnly));
                                        }}
                                    />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />
                    </FieldGroup>
                </form>

                <DialogFooter>
                    <Button type="submit" form="goal-form" disabled={isPending}>
                        {isPending ? 'Saving...' : 'Save Target'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
