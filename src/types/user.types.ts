export interface User {
    id: string;
    email: string;
    name: string;
    createdAt: string;
}

export interface RegisterInput {
    email: string;
    password: string;
    name: string;
}

export interface LoginInput {
    email: string;
    password: string;
}

export interface ForgotPasswordInput {
    email: string;
}

export interface ResetPasswordInput {
    email: string;
    otp: string;
    newPassword: string;
}