'use client'
import { PrivateRoute } from '@/components/organisms/PrivateRoute'
import { Toaster } from '@/components/ui/toaster'
import { checkIsPublicRoute } from '@/functions/checkIsPublic'
import { usePathname } from 'next/navigation'

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isPublic = checkIsPublicRoute(pathname)

  return (
    <>
      <Toaster />
      {isPublic && children}
      {!isPublic && <PrivateRoute>{children}</PrivateRoute>}
    </>
  )
}
