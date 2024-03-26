import { Footer } from '@/components/organisms/Footer'
import { Navbar } from '@/components/organisms/Navbar'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default function LayoutDashboard({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies()
  const authenticated = cookieStore.get('auth.token')?.value

  if (!authenticated) {
    redirect('/')
  }

  return (
    <div className="max-w-screen-lg mx-auto p-2 min-h-screen h-full flex flex-col">
      <Navbar />
      <div className="grow-1">{children}</div>
      <Footer />
    </div>
  )
}
