import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ClientLayout } from './client-layout';
import { AuthGuard } from '@/components/auth/auth-guard';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Conveya',
  description: 'Build and share forms easily',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthGuard>
          <ClientLayout>{children}</ClientLayout>
        </AuthGuard>
      </body>
    </html>
  );
}