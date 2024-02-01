'use client'
import { Toaster } from '@/components/ui/toaster'
import { AuthProvider } from '@/context/authContext'
import { ProductsProvider } from '@/context/productsContext'
import { ThemeProvider } from '@/theme/provider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <Toaster />
        <AuthProvider>
          <ProductsProvider>{children}</ProductsProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
