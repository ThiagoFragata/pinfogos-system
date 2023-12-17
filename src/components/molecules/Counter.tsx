'use client'
import { Minus, Plus } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

export function Counter() {
  const [counter, setCounter] = useState(1)

  function decrement() {
    if (counter > 1) {
      setCounter((prev) => prev - 1)
    }
  }

  function increment() {
    if (counter < 9999) {
      setCounter((prev) => prev + 1)
    }
  }

  return (
    <div className="flex gap-2">
      <Button className="p-3 bg-red-500" onClick={decrement}>
        <Minus className="h-4 w-4" />
      </Button>
      <Input
        className="max-w-[100px] text-center"
        type="number"
        min={1}
        max={9999}
        maxLength={4}
        value={counter}
        onChange={(e) => setCounter(Number(e.target.value))}
      />
      <Button className="p-3 bg-green-500" onClick={increment}>
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  )
}
