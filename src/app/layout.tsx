import { Geist, Geist_Mono } from "next/font/google";
import { MantineProvider, Box } from '@mantine/core';
import { AuthProvider } from "@/hooks/contexts/auth";
import { Header } from "@/components/layout/header/Header";
import { I18nProvider } from '@/components/common/I18nProvider';

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

import { siteMetadata } from '../data/metadata';
import { Footer } from "@/components/layout/footer/Footer";
import { Notifications } from "@mantine/notifications";

export const metadata = siteMetadata;

/**
 * Root layout component for the application.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MantineProvider
          theme={{
            components: {
              Container: {
                defaultProps: {
                  fluid: true,
                },
              },
            },
          }}
        >
          <AuthProvider>
            <Box style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <Header />
              <Box style={{ flex: 1 }}>
                <I18nProvider>
                    <Notifications />
                    {children}
                </I18nProvider>
              </Box>
              <Footer />
            </Box>
          </AuthProvider>
        </MantineProvider>
      </body>
    </html>
  );
}