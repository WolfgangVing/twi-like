import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { dark } from '@clerk/themes';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from "sonner"
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TwiLike App',
  description: 'Stream your games and lives to your frinds and fans',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en">
        <body className={inter.className}>
          <Toaster theme='light' position='bottom-center'/>
          <ThemeProvider
            attribute="class"
            forcedTheme="dark"
            storageKey="twilike-theme"
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
