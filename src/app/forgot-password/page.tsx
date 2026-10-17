// src/app/forgot-password/page.tsx

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { KeyRound } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useForgotPassword } from '@/hooks/useForgotPassword';
import {
  forgotPasswordFormSchema,
  ForgotPasswordFormValues,
} from '@/constants/auth-form.schema';
import { ApiError } from '@/lib/api-client';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { mutateAsync, isPending } = useForgotPassword();
  const [serverError, setServerError] = useState<string | null>(null);
  const [result, setResult] = useState<{ email: string; otp?: string } | null>(null);

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    setServerError(null);
    try {
      const data = await mutateAsync(values);
      setResult({ email: values.email, otp: data?.otp });
    } catch (error) {
      setServerError(error instanceof ApiError ? error.message : 'Something went wrong');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-sm rounded-lg border bg-background p-6 shadow-sm">
        <div className="mb-6 flex flex-col items-center gap-2">
          <KeyRound className="h-8 w-8" />
          <h1 className="font-serif text-2xl font-bold">Forgot password?</h1>
          <p className="text-center text-sm text-muted-foreground">
            Enter your email and we&apos;ll generate a reset code.
          </p>
        </div>

        {result ? (
          <div className="flex flex-col gap-4">
            {result.otp ? (
              <div className="rounded-md border border-dashed border-orange-300 bg-orange-50 p-4 text-center">
                <p className="text-xs font-medium tracking-wide text-orange-700">
                  DEV MODE · YOUR RESET CODE
                </p>
                <p className="mt-1 font-mono text-3xl font-bold tracking-widest">
                  {result.otp}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  Shown here only because email delivery isn&apos;t set up yet. It expires in
                  10 minutes.
                </p>
              </div>
            ) : (
              <p className="text-center text-sm text-muted-foreground">
                If that email is registered, a reset code has been generated.
              </p>
            )}

            <Button
              className="w-full"
              onClick={() =>
                router.push(`/reset-password?email=${encodeURIComponent(result.email)}`)
              }
            >
              Enter code
            </Button>
          </div>
        ) : (
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="forgot-email">Email</FieldLabel>
                    <Input
                      {...field}
                      id="forgot-email"
                      type="email"
                      placeholder="you@example.com"
                      aria-invalid={fieldState.invalid}
                      autoComplete="email"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              {serverError && (
                <p className="text-sm font-medium text-destructive">{serverError}</p>
              )}

              <Button type="submit" disabled={isPending} className="w-full">
                {isPending ? 'Generating code...' : 'Get reset code'}
              </Button>
            </FieldGroup>
          </form>
        )}

        <p className="mt-4 text-center text-sm text-muted-foreground">
          <Link href="/login" className="font-medium text-foreground underline underline-offset-4">
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
}