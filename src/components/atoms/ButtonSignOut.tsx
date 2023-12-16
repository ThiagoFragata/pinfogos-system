'use client'
import { LogOut } from 'lucide-react'
import { Button, ButtonProps } from '../ui/button'

type ButtonSignOutProps = ButtonProps

export function ButtonSignOut({ ...props }: ButtonSignOutProps) {
  return (
    <Button variant="outline" size="icon" {...props}>
      <LogOut className="h-4 w-4" />
    </Button>
  )
}
