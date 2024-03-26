import { useProducts } from '@/hooks/useProducts'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'

export function ProductsNote() {
  const { noteProducts } = useProducts()

  return (
    <Table>
      <TableCaption>
        {noteProducts.length === 0 ? 'Nenhum item adicionado' : 'Produtos adicionado(s) a compra'}
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Produto</TableHead>
          <TableHead>Quantidade</TableHead>
          <TableHead className="text-right">Valor</TableHead>
        </TableRow>
      </TableHeader>

      {noteProducts.length > 0 && (
        <TableBody>
          {noteProducts.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{product.qtd}</TableCell>
              <TableCell className="text-right">{product.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      )}
    </Table>
  )
}
