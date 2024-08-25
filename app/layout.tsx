import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import Providers from '@/components/ui/providers';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = { title: 'DBEST Stack' };

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html className={'h-full'} suppressHydrationWarning>
      <body>
        <div
          className={cn(
            'h-full bg-background p-4 font-inter antialiased',
            inter.variable
          )}>
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
