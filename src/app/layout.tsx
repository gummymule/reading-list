'use client';

// import type { Metadata } from 'next';
import { Sidebar } from '@/components/layout/Sidebar';
import './globals.css';
import { QueryProvider } from '@/components/providers/QueryProvider';
import { Toaster } from 'sonner';
import { AuthProvider } from '@/hooks/useAuth';
import { RequireAuth } from '@/components/auth/RequireAuth';
import { usePathname } from 'next/navigation';
import { PUBLIC_PATHS } from '@/constants/public-paths.constant';


// export const metadata: Metadata = {
//   title: 'Bookshelf',
//   description: 'Track your reading progress and manage your personal book collection.',
// };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPublicPath = PUBLIC_PATHS.includes(pathname);
  return (
    <html lang="en">
      <body className="flex">
        <QueryProvider>
          <AuthProvider>
            <RequireAuth>
              {!isPublicPath && <Sidebar />}
              <div className={isPublicPath ? "flex-1" : "flex-1 overflow-y-auto p-8"}>
                {children}
              </div>
            </RequireAuth>
            <Toaster />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}