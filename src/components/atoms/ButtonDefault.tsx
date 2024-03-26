import { Loader2 } from 'lucide-react'
import { Button, ButtonProps } from '../ui/button'

interface ButtonDefaultProps extends ButtonProps {
  label: string
  loading?: boolean
}

export function ButtonDefault({ className, label, loading, ...props }: ButtonDefaultProps) {
  return (
    <Button className={className} disabled={loading} {...props}>
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {label}
    </Button>
  )
}
