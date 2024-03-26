'use client'

import { useProducts } from '@/hooks/useProducts'
import { Loader2 } from 'lucide-react'

export default function Template({ children }: { children: React.ReactNode }) {
  const { loadingSale } = useProducts()

  return (
    <>
      {loadingSale && (
        <div className="flex flex-col mt-[25%] translate-y-[-25%] items-center justify-center gap-4">
          <Loader2 className="animate-spin" />
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-lg font-bold">Efetuando a venda</h1>
            <p className="font-light">Aguarde alguns instantes enquanto registramos sua venda</p>
          </div>
        </div>
      )}

      {!loadingSale && <div>{children}</div>}
    </>
  )
}
