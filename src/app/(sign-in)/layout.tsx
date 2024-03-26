import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default function LayoutSignIn({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies()
  const authenticated = cookieStore.get('auth.token')?.value

  if (authenticated) {
    redirect('/dashboard/sales')
  }

  return children
}
