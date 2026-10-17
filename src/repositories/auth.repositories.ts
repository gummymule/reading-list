import { apiClient } from '../lib/api-client';
import type { User, RegisterInput, LoginInput, ResetPasswordInput, ForgotPasswordInput } from '@/types/user.types';

export const authRepository = {
    register: (data: RegisterInput): Promise<User> => 
        apiClient.post<User>('/auth/register', data),

    login: (data: LoginInput): Promise<User> => 
        apiClient.post<User>('/auth/login', data),

    logout: ():Promise<void> => apiClient.post<void>('/auth/logout', {}),

    profile: (): Promise<User> => apiClient.get<User>('/auth/profile'),

    forgotPassword: (data: ForgotPasswordInput): Promise<{ otp?: string } | undefined> => 
        apiClient.post<{ otp?: string } | undefined>('/auth/forgot-password', data),

    resetPassword: (data: ResetPasswordInput): Promise<void> => 
        apiClient.post<void>('/auth/reset-password', data),
}