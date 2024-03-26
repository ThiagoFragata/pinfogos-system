'use client'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button, ButtonProps } from '../ui/button'

interface ButtonRedirectProps extends ButtonProps {
  label: string
  loading?: boolean
  url: string
}

export function ButtonRedirect({ className, label, loading, url, ...props }: ButtonRedirectProps) {
  const { push } = useRouter()
  return (
    <Button className={className} disabled={loading} onClick={() => push(url)} {...props}>
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {label}
    </Button>
  )
}
