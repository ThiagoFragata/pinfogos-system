import { Loader2 } from 'lucide-react'

export default function Loading() {
  return (
    <div className="flex flex-col mt-[25%] translate-y-[-25%] items-center justify-center gap-4">
      <Loader2 className="animate-spin" />
      <div className="text-center flex flex-col gap-2">
        <h1 className="font-bold text-lg">Carregando</h1>
        <p className="font-light">Aguarde alguns instantes, estamos buscando suas informações</p>
      </div>
    </div>
  )
}
