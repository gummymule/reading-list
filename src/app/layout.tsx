import type { Metadata } from 'next';
import { Sidebar } from '@/components/layout/Sidebar';
import './globals.css';
import { QueryProvider } from '@/components/providers/QueryProvider';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'Bookshelf',
  description: 'Track your reading progress and manage your personal book collection.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex">
        <QueryProvider>
          <Sidebar />
          <div className="flex-1 overflow-y-auto p-8">{children}</div>
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  );
}