import { Footer } from '@/components/organisms/Footer'
import { Navbar } from '@/components/organisms/Navbar'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default function LayoutDashboard({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies()
  const authenticated = cookieStore.get('auth.token')?.value

  if (authenticated === undefined) {
    redirect('/')
  }

  return (
    <div className="max-w-screen-lg mx-auto p-2 min-h-screen flex flex-col justify-between">
      <div>
        <Navbar />
        {children}
      </div>
      <Footer />
    </div>
  )
}
