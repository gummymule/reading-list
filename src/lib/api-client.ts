const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api';

interface ApiEnvelope<T> {
    responseCode: string;
    responseDesc: string;
    responseData: T;
}

export class ApiError extends Error {
    constructor(
        message: string,
        public responseCode: string,
        public responseDesc: string
    ) {
        super(message);
        this.name = 'ApiError';
    }
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
    const res = await fetch(`${API_BASE_URL}${path}`, {
        ...options,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        },
    });

    const json: ApiEnvelope<T> = await res.json();

    if (!res.ok || json.responseCode !== '00') {
        throw new ApiError(
            `API request failed with status ${res.status}`,
            json.responseCode,
            json.responseDesc,
        );
    }

    return json.responseData as T;
}

export const apiClient = {
    get: <T>(path: string) => request<T>(path, { method: 'GET' }),

    post: <T>(path: string, body: unknown) => request<T>(path, {
        method: 'POST',
        body: JSON.stringify(body),
    }),

    patch: <T>(path: string, body: unknown) => request<T>(path, {
        method: 'PATCH',
        body: JSON.stringify(body),
    }),

    delete: <T>(path: string) => request<T>(path, { method: 'DELETE' }),
}