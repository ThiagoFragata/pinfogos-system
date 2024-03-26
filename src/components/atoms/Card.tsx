import { Skeleton } from '../ui/skeleton'

interface CardProps {
  subtitle: string
  title: string | number
  description: string
  loading: boolean
}

export function Card({ description, subtitle, title, loading }: CardProps) {
  return (
    <div className="flex flex-col flex-1 p-4 border rounded-md border-neutral-300 dark:border-neutral-800">
      <p className="text-xs uppercase text-zinc-500">{subtitle}</p>
      {loading ? <Skeleton className="h-9 w-[100px]" /> : <h1 className="text-3xl font-bold">{title}</h1>}
      <small>{description}</small>
    </div>
  )
}
