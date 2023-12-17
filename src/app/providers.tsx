'use client'
import { PrivateRoute } from '@/components/organisms/PrivateRoute'
import { Toaster } from '@/components/ui/toaster'
<<<<<<< HEAD
=======
import { AuthProvider } from '@/context/authContext'
>>>>>>> main
import { checkIsPublicRoute } from '@/functions/checkIsPublic'
import { usePathname } from 'next/navigation'

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
<<<<<<< HEAD
  const isPublic = checkIsPublicRoute(pathname!)
=======
  const isPublic = checkIsPublicRoute(pathname)
>>>>>>> main

  return (
    <>
      <AuthProvider>
        <Toaster />
        {isPublic && children}
        {!isPublic && <PrivateRoute>{children}</PrivateRoute>}
      </AuthProvider>
    </>
  )
}
