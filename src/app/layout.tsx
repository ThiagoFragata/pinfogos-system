import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/theme/provider'
import { Metadata } from 'next'
<<<<<<< HEAD
import { Inter as FontSans } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
})
=======
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
>>>>>>> main

export const metadata: Metadata = {
  title: 'StockFlow | Parintins Show Fogos',
  description: 'Sistema de gestão/controle de estoque e ponto de venda.',
  authors: [
    {
      name: 'Thiago Henrique Fragata',
<<<<<<< HEAD
      url: 'https://postfolio-thiagofragata.vercel.app'
    }
  ]
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
=======
      url: 'https://postfolio-thiagofragata.vercel.app',
    },
  ],
}

const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
>>>>>>> main
          <Providers>{children}</Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}
