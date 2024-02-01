'use client'
import { formattedMoney, unformattedMoney } from '@/functions/formattedMoney'
import { useProducts } from '@/hooks/useProducts'
import { Minus, Plus } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

export function Counter() {
  const { productSelected, counter, setCounter } = useProducts()

  function decrement() {
    if (counter > 1) {
      setCounter((prev) => prev - 1)
    }
  }

  function increment() {
    if (counter < productSelected!.qtd) {
      setCounter((prev) => prev + 1)
    }
  }

  return (
    <div>
      <div className="flex gap-2">
        <Button className="p-3 bg-red-500" onClick={decrement}>
          <Minus className="h-4 w-4" />
        </Button>
        <Input
          className="max-w-[100px] text-center"
          type="number"
          min={1}
          max={productSelected?.qtd}
          maxLength={4}
          value={counter}
          onChange={(e) => setCounter(Number(e.target.value))}
        />
        <Button className="p-3 bg-green-500" onClick={increment}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      {counter > 1 && (
        <div className="flex flex-col gap-2 mt-4">
          <h1 className="text-lg">Subtotal</h1>
          <p className="text-3xl font-semibold">
            {formattedMoney(String(unformattedMoney(productSelected!.value) * counter))}
          </p>
        </div>
      )}
    </div>
  )
}
