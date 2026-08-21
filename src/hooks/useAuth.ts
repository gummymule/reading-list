'use client';

import { createContext, createElement, useContext, ReactNode } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authRepository } from '@/repositories/auth.repositories';
import { authQueryKeys } from '@/constants/query-keys.constant';
import { User, LoginInput, RegisterInput } from '@/types/user.types';
import { ApiError } from '@/lib/api-client';

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  login: (data: LoginInput) => Promise<void>;
  register: (data: RegisterInput) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticating: boolean;
  authError: string | null;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery({
    queryKey: authQueryKeys.profile,
    queryFn: authRepository.profile,
    retry: false, 
    staleTime: 5 * 60 * 1000, 
  });

  const loginMutation = useMutation({
    mutationFn: authRepository.login,
    onSuccess: (newUser) => {
      queryClient.setQueryData(authQueryKeys.profile, newUser);
    },
  });

  const registerMutation = useMutation({
    mutationFn: authRepository.register,
    onSuccess: (newUser) => {
      queryClient.setQueryData(authQueryKeys.profile, newUser);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: authRepository.logout,
    onSuccess: () => {
      queryClient.setQueryData(authQueryKeys.profile, null);
      queryClient.clear();
    },
  });

  const isAuthenticating = loginMutation.isPending || registerMutation.isPending;
  const activeError = loginMutation.error ?? registerMutation.error;
  const authError = activeError instanceof ApiError ? activeError.message : null;

  return createElement(
    AuthContext.Provider,
    {
      value: {
        user: user ?? null,
        isLoading,
        login: async (data) => {
          await loginMutation.mutateAsync(data);
        },
        register: async (data) => {
          await registerMutation.mutateAsync(data);
        },
        logout: async () => {
          await logoutMutation.mutateAsync();
        },
        isAuthenticating,
        authError,
      },
    },
    children,
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}