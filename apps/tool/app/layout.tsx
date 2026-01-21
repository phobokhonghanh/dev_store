import NavbarLayout from '@/components/navbar'
import VersionBadge from '@/components/VersionBadge'
import Footer from '@origini/components/Footer'
import Head from '@origini/components/Head'
import '@origini/components/styles.css'
import ThemeProvider from '@origini/components/ThemeProvider'
import { toolConfig } from '@origini/config'
import { cn } from '@origini/libs/utils'
import { Inter, Libre_Baskerville } from 'next/font/google'
import './globals.css'

const inter = Inter({
  weight: ['400', '700'],
  subsets: ['latin', 'vietnamese'],
  variable: '--font-inter',
  display: 'swap',
})

const libreBaskerville = Libre_Baskerville({
  weight: ['400', '700'],
  subsets: ['latin', 'latin-ext'],
  variable: '--font-serif',
  display: 'swap',
})

export const metadata = toolConfig.metadata

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      className={cn(inter.variable, libreBaskerville.variable)}
      lang={toolConfig.metadata.lang}
      style={{
        fontFamily: toolConfig.fontFamily,
      }}
      suppressHydrationWarning
    >
      <Head />
      <body
        className={cn(
          'bg-[var(--background)] text-[var(--foreground)] subpixel-antialiased',
          'transition-colors duration-1000',
        )}
      >
        <ThemeProvider>
          <VersionBadge />
          <NavbarLayout>{children}</NavbarLayout>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
