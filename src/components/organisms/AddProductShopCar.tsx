'use client'
import { useProducts } from '@/hooks/useProducts'
import { ShieldAlert } from 'lucide-react'
import { Counter } from '../molecules/Counter'
import { Alert, AlertDescription, AlertTitle } from '../ui/alert'
import { Button } from '../ui/button'

export function AddProductShopCar() {
  const { productSelected, handleAddProductNote } = useProducts()

  if (!productSelected) {
    return null
  }

  return (
    <div className="flex flex-col items-start justify-between gap-8 mt-8">
      {productSelected &&
        (productSelected.qtd > 0 ? (
          <>
            <div>
              <p className="font-medium text-gray-500">{productSelected?.name}</p>
              <h1 className="text-3xl font-bold">{productSelected?.value}</h1>
              <p className="mt-4 mb-2 text-sm">Quantidade</p>
              <Counter />
            </div>

            <Button className="px-6 py-8 min-w-[156px]" variant="outline" onClick={handleAddProductNote}>
              Adicionar
            </Button>
          </>
        ) : (
          <Alert variant={'destructive'}>
            <ShieldAlert className="w-5 h-5" />
            <AlertTitle>Ops, esse produto está em falta no estoque!</AlertTitle>
            <AlertDescription>Selecione outro produto</AlertDescription>
          </Alert>
        ))}
    </div>
  )
}
