// src/app/reset-password/page.tsx

'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useResetPassword } from '@/hooks/useResetPassword';
import {
  resetPasswordFormSchema,
  ResetPasswordFormValues,
} from '@/constants/auth-form.schema';
import { ApiError } from '@/lib/api-client';

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { mutateAsync, isPending } = useResetPassword();
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      email: searchParams.get('email') ?? '',
      otp: '',
      newPassword: '',
    },
  });

  const onSubmit = async (values: ResetPasswordFormValues) => {
    setServerError(null);
    try {
      await mutateAsync(values);
      toast.success('Password reset', {
        description: 'You can now log in with your new password.',
      });
      router.push('/login');
    } catch (error) {
      setServerError(error instanceof ApiError ? error.message : 'Something went wrong');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-sm rounded-lg border bg-background p-6 shadow-sm">
        <div className="mb-6 flex flex-col items-center gap-2">
          <ShieldCheck className="h-8 w-8" />
          <h1 className="font-serif text-2xl font-bold">Reset password</h1>
          <p className="text-center text-sm text-muted-foreground">
            Enter the 6-digit code and your new password.
          </p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="reset-email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="reset-email"
                    type="email"
                    placeholder="you@example.com"
                    aria-invalid={fieldState.invalid}
                    autoComplete="email"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="otp"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="reset-otp">Reset code</FieldLabel>
                  <Input
                    {...field}
                    id="reset-otp"
                    inputMode="numeric"
                    maxLength={6}
                    placeholder="123456"
                    className="font-mono tracking-widest"
                    aria-invalid={fieldState.invalid}
                    autoComplete="one-time-code"
                    onChange={(e) => field.onChange(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="newPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="reset-password">New password</FieldLabel>
                  <Input
                    {...field}
                    id="reset-password"
                    type="password"
                    placeholder="At least 8 characters"
                    aria-invalid={fieldState.invalid}
                    autoComplete="new-password"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {serverError && (
              <p className="text-sm font-medium text-destructive">{serverError}</p>
            )}

            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? 'Resetting...' : 'Reset password'}
            </Button>
          </FieldGroup>
        </form>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          <Link href="/forgot-password" className="font-medium text-foreground underline underline-offset-4">
            Request a new code
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordForm />
    </Suspense>
  );
}