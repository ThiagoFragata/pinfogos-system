import { Skeleton } from '../ui/skeleton'

interface CardProps {
  subtitle: string
  title: string
  description: string
  loading: boolean
}

export function Card({ description, subtitle, title, loading }: CardProps) {
  return (
    <div className="flex flex-1 flex-col border border-black p-4 rounded-md">
      <p className="uppercase text-xs text-zinc-500">{subtitle}</p>
      {loading ? <Skeleton className="h-9 w-[100px]" /> : <h1 className="font-bold text-3xl">{title}</h1>}
      <small>{description}</small>
    </div>
  )
}
