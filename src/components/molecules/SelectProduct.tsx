'use client'
import { Check, ChevronsUpDown, Loader2 } from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useProducts } from '@/hooks/useProducts'
import { cn } from '@/lib/utils'

export function SelectProduct() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState('')
  const { isLoading, isRefetching, productID, productsItems, setProductID, setCounter } = useProducts()

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="justify-between">
          <div className="flex items-center gap-2">
            {isLoading && <Loader2 className="w-4 h-4 ml-2 opacity-50 shrink-0 animate-spin" />}
            {isRefetching && <Loader2 className="w-4 h-4 ml-2 opacity-50 shrink-0 animate-spin" />}
            {value ? productsItems.find((product) => product.id === productID)?.name : 'Selecione um produto...'}
          </div>
          <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Pesquise um produto..." />
          <CommandList>
            <CommandEmpty>Produto não encontrado.</CommandEmpty>
            <CommandGroup>
              {productsItems.map((product) => (
                <CommandItem
                  key={product.id}
                  value={product.name}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? '' : currentValue)
                    setProductID(product.id)
                    setOpen(false)
                    setCounter(1)
                  }}
                >
                  <Check className={cn('mr-2 h-4 w-4', productID === product.id ? 'opacity-100' : 'opacity-0')} />
                  <div className="flex justify-between w-full">
                    <span>{product.name}</span>
                    <span>{product.qtd}</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
