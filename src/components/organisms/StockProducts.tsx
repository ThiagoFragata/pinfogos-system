'use client'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ProductProps } from '@/interfaces/products'
import { Edit, Loader2 } from 'lucide-react'
import { Button } from '../ui/button'
import { Skeleton } from '../ui/skeleton'

interface StockProductsProps {
  products: ProductProps[]
  loading?: boolean
  refetch?: boolean
}

export function StockProducts({ products, loading, refetch }: StockProductsProps) {
  return (
    <Table>
      <TableCaption>Nota de compra</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="flex items-center gap-2">
            Produto
            {refetch && <Loader2 className="animate-spin" />}
          </TableHead>
          <TableHead>Quantidade</TableHead>
          <TableHead>Valor unit</TableHead>
          <TableHead>Editar</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {loading ? (
          <TableRow className="space-y-2">
            <TableCell>
              <Skeleton className="h-8 w-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-8 w-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-8 w-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-8 w-full" />
            </TableCell>
          </TableRow>
        ) : (
          products.map((product: ProductProps) => {
            return (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.qtd}</TableCell>
                <TableCell>{product.value}</TableCell>
                <TableCell>
                  <Button variant="ghost" className="p-2">
                    <Edit />
                  </Button>
                </TableCell>
              </TableRow>
            )
          })
        )}
        {}
      </TableBody>
    </Table>
  )
}
