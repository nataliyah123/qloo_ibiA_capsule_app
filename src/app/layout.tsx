import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { QueryProvider } from '@/components/providers/query-provider'
import { Toaster } from '@/components/ui/toaster'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ibiA Capsule: Build Your Next Self',
  description: 'Transform yourself with curated 7-day micro-curriculums blending books, podcasts, restaurants, travel, and fitness.',
  keywords: ['personal development', 'self improvement', 'curated content', 'lifestyle'],
  authors: [{ name: 'Capsule Team' }],
  creator: 'Capsule',
  publisher: 'Capsule',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://capsule-app.vercel.app'),
  openGraph: {
    title: 'ibiA Capsule: Build Your Next Self',
    description: 'Transform yourself with curated 7-day micro-curriculums',
    url: 'https://capsule-app.vercel.app',
    siteName: 'ibiA Capsule',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ibiA Capsule: Build Your Next Self',
    description: 'Transform yourself with curated 7-day micro-curriculums',
    creator: '@capsule_app',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            {children}
            <Toaster />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}