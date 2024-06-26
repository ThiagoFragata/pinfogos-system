'use client'
import { Check, Loader2, Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useProducts } from '@/hooks/useProducts'
import { ProductProps } from '@/interfaces/products'
import { cn } from '@/lib/utils'
import { useState } from 'react'

export function SelectSearchProducts() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [productID, setProductID] = useState('')

  const { productsItems, isLoading, isRefetching, setProductsItems } = useProducts()

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
          disabled={isLoading}
        >
          <div className="flex gap-2 items-center">
            {isLoading && <Loader2 className="ml-2 h-4 w-4 shrink-0 opacity-50 animate-spin" />}
            {isRefetching && <Loader2 className="ml-2 h-4 w-4 shrink-0 opacity-50 animate-spin" />}
            {name || 'Selecione um produto...'}
          </div>
          <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[500px] p-0">
        <Command>
          <CommandInput placeholder="Pesquise um produto..." />
          <CommandList>
            <CommandEmpty>Produto não encontrado</CommandEmpty>
            <CommandGroup>
              {productsItems?.map((item: ProductProps) => (
                <CommandItem
                  key={item.id}
                  value={item.name}
                  onSelect={(currentValue) => {
                    setName(currentValue === name ? '' : currentValue)
                    setProductID(item.id)
                    setProductsItems(() => [item])
                    setOpen(false)
                  }}
                >
                  <Check className={cn('mr-2 h-4 w-4', productID === item.id ? 'opacity-100' : 'opacity-0')} />
                  <div className="flex justify-between w-full">
                    <span>{item.name}</span>
                    <span>{item.qtd}</span>
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
