import type { Metadata } from 'next';
import {
  Geist,
  Geist_Mono,
  Inter,
  Inter_Tight,
  Noto_Sans,
} from 'next/font/google';
import '../index.css';
import Providers from '@/components/providers';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from 'sonner';

// const interTight = Inter_Tight({
//   variable: '--font-inter-tight',
//   subsets: ['latin'],
// });

const notoSans = Noto_Sans({
  variable: '--font-noto-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Orbyte',
  description: 'orbyte',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${notoSans.variable} antialiased`}>
        <ThemeProvider>
          <Providers>{children}</Providers>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
