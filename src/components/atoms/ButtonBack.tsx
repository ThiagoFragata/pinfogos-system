'use client'
import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'

export function ButtonBack() {
  const { back } = useRouter()

  return (
    <Button className="h-full" variant="ghost" onClick={() => back()}>
      <ChevronLeft className="w-6 h-6" />
    </Button>
  )
}
