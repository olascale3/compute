import type { Metadata } from 'next';
import { Cormorant_Garamond, JetBrains_Mono, Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
});

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
});

const jetbrains = JetBrains_Mono({
  variable: '--font-jetbrains',
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'TrueCompute — AI Cost Intelligence',
  description:
    'Know the true cost of every AI query. Real-time cost tracking across OpenAI, Anthropic, Google, and 15+ providers.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${cormorant.variable} ${jetbrains.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
