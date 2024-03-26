/* eslint-disable @next/next/no-sync-scripts */
import { cn } from '@/lib/utils'
import { Metadata } from 'next'
import { Chivo as Font } from 'next/font/google'

import './globals.css'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'StockFlow | Parintins Show Fogos',
  description: 'Sistema de gestão/controle de estoque e ponto de venda.',
  authors: [
    {
      name: 'Thiago Henrique Fragata',
      url: 'https://postfolio-thiagofragata.vercel.app'
    }
  ]
}

const fontSans = Font({
  subsets: ['latin'],
  variable: '--font-sans'
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt_BR">
      <head>
        <script src="http://localhost:8097" />
      </head>
      <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
