import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { AuthProvider } from "@/hooks/contexts/auth";
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/footer/Footer";

import "./globals.css";
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Giải pháp chuyên nghiệp',
  description: 'Cung cấp giải pháp và sáng tạo tính năng.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        {/* <ColorSchemeScript /> */}
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MantineProvider>
          <Header />
            <AuthProvider>{children}</AuthProvider>
          <Footer />
        </MantineProvider>
      </body>
    </html>
  );
}