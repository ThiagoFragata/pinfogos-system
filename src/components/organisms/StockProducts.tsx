'use client'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ProductProps } from '@/interfaces/products'
import { Edit } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import { Skeleton } from '../ui/skeleton'

interface StockProductsProps {
  products: ProductProps[]
  loading?: boolean
}

export function StockProducts({ products, loading }: StockProductsProps) {
  const { push } = useRouter()
  return (
    <Table>
      <TableCaption>Lista de todos os produtos</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="flex items-center gap-2">Produto</TableHead>
          <TableHead>Quantidade</TableHead>
          <TableHead>Valor unit</TableHead>
          <TableHead className="text-right">Editar</TableHead>
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
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    className="p-2"
                    onClick={() => push(`/dashboard/product-stock/edit-product/${product.id}`)}
                  >
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
