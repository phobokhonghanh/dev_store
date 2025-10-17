import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// Import CSS và Provider của Mantine
import '@mantine/core/styles.css';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { AuthProvider } from "@/hooks/contexts/auth";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'ThạchCaoPro | Giải pháp chuyên nghiệp',
  description: 'Cung cấp giải pháp trần và vách ngăn thạch cao thẩm mỹ, bền vững và an toàn.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" data-mantine-color-scheme="light">
      <head>
        <ColorSchemeScript />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MantineProvider><AuthProvider>{children}</AuthProvider></MantineProvider>
      </body>
    </html>
  );
}
