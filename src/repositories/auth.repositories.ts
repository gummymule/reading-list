import { apiClient } from '../lib/api-client';
import type { User, RegisterInput, LoginInput } from '@/types/user.types';

export const authRepository = {
    register: (data: RegisterInput): Promise<User> => 
        apiClient.post<User>('/auth/register', data),

    login: (data: LoginInput): Promise<User> => 
        apiClient.post<User>('/auth/login', data),

    logout: ():Promise<void> => apiClient.post<void>('/auth/logout', {}),

    profile: (): Promise<User> => apiClient.get<User>('/auth/profile'),
}