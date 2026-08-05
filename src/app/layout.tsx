import { Sidebar } from '@/components/layout/Sidebar';
import './globals.css';
import { QueryProvider } from '@/components/providers/QueryProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex">
        <QueryProvider>
          <Sidebar />
          <div className="flex-1 overflow-y-auto p-8">{children}</div>
        </QueryProvider>
      </body>
    </html>
  );
}