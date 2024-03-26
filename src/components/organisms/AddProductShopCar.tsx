'use client'

import { useProducts } from '@/hooks/useProducts'
import { Check } from 'lucide-react'
import { Counter } from '../molecules/Counter'
import { Button } from '../ui/button'

export function AddProductShopCar() {
  const { productSelected, handleAddProductNote } = useProducts()

  return (
    <div className="flex items-center justify-between mt-8">
      {productSelected && (
        <>
          <div>
            <p className="font-medium text-gray-500">{productSelected?.name}</p>
            <h1 className="font-bold text-3xl">{productSelected?.value}</h1>
            <p className="mt-4 mb-2 text-sm">Quantidade</p>
            <Counter />
          </div>

          <Button className="px-6 py-8" variant="outline" onClick={handleAddProductNote}>
            <Check />
          </Button>
        </>
      )}
    </div>
  )
}
