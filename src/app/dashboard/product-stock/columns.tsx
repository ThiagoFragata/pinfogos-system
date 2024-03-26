'use client'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { ProductProps } from '@/interfaces/products'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, ClipboardCopy, MoreHorizontal, Settings2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface DropdownMenuItemEditProps {
  id: string
}

export function DropdownMenuItemEdit({ id }: DropdownMenuItemEditProps) {
  const { push } = useRouter()

  function handleRedirect() {
    push(`/dashboard/product-stock/edit-product/${id}`)
  }

  return (
    <DropdownMenuItem className="gap-2" onClick={handleRedirect}>
      <div className="flex gap-2 items-center p-2">
        <Settings2 className="h-4 w-4" />
        Editar
      </div>
    </DropdownMenuItem>
  )
}

export const columns: ColumnDef<ProductProps>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-2">
          <h1>Produto</h1>

          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  },
  {
    accessorKey: 'qtd',
    header: 'Quantidade'
  },
  {
    accessorKey: 'value',
    header: 'Valor'
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const stock = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Opções</DropdownMenuLabel>

            <DropdownMenuItem className="gap-2" onClick={() => navigator.clipboard.writeText(stock.id)}>
              <div className="flex gap-2 items-center p-2">
                <ClipboardCopy className="h-4 w-4" />
                Copiar Id
              </div>
            </DropdownMenuItem>

            <DropdownMenuItemEdit id={stock.id} />

            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]
