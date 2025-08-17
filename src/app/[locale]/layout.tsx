import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import * as React from 'react';
import '@assets/styles/_globals.scss';
import Header from '@components/Header/Header';
import { ThemeProvider } from '@/context/theme/ThemeProvider.tsx';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { getMessages } from 'next-intl/server';
import { AppProviders } from '@/core/api/appProvider.tsx';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'rs-react-app',
  description: 'RSSchool task',
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <AppProviders>
              <Header />
              <main className="container">{children}</main>
            </AppProviders>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
