'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { PUBLIC_PATHS } from '@/constants/public-paths.constant';

export function RequireAuth({ children }: { children: React.ReactNode }) {
    const { user, isLoading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    const isPublicPath = PUBLIC_PATHS.includes(pathname);

    useEffect(() => {
        if (isLoading) return;

        if (!user && !isPublicPath) {
            router.replace('/login');
        }

        if (user && isPublicPath) {
            router.replace('/');
        }
    },[user, isLoading, isPublicPath, router, pathname]);

    if (isLoading) {
        return (
            <div className="flex h-screen w-full items-center justify-center">
                <p className="text-sm text-muted-foreground">Loading...</p>
            </div>
        );
    }

    if (!user && !isPublicPath) {
        return null;
    }

    if (user && isPublicPath) {
        return null;
    }

    return <>{children}</>;
}