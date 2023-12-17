import { Footer } from '@/components/organisms/Footer'
import { Navbar } from '@/components/organisms/Navbar'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Vendas | StockFlow'
}

export default function LayoutDashboard({ children }: { children: React.ReactNode }) {
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
