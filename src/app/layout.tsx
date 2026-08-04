import { Sidebar } from '@/components/layout/Sidebar';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex">
        <Sidebar />
        <div className="flex-1 overflow-y-auto p-8">{children}</div>
      </body>
    </html>
  );
}