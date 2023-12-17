import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Edit, Plus } from 'lucide-react'
import { Button } from '../ui/button'

export function StockProducts() {
  return (
    <Table>
      <TableCaption>Nota de compra</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="">Produto</TableHead>
          <TableHead className="text-center">Quantidade</TableHead>
          <TableHead className="text-center">Valor</TableHead>
          <TableHead className="text-right">Adicionar</TableHead>
          <TableHead className="text-right">Editar</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell className="text-center">12</TableCell>
          <TableCell className="text-center">R$250,00</TableCell>
          <TableCell className="text-right">
            <Button variant="ghost" className="p-2">
              <Plus />
            </Button>
          </TableCell>
          <TableCell className="text-right">
            <Button variant="ghost" className="p-2">
              <Edit />
            </Button>
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell className="font-medium">INV002</TableCell>
          <TableCell className="text-center">12</TableCell>
          <TableCell className="text-center">R$250,00</TableCell>
          <TableCell className="text-right">
            <Button variant="ghost" className="p-2">
              <Plus />
            </Button>
          </TableCell>
          <TableCell className="text-right">
            <Button variant="ghost" className="p-2">
              <Edit />
            </Button>
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell className="font-medium">INV003</TableCell>
          <TableCell className="text-center">12</TableCell>
          <TableCell className="text-center">R$250,00</TableCell>
          <TableCell className="text-right">
            <Button variant="ghost" className="p-2">
              <Plus />
            </Button>
          </TableCell>
          <TableCell className="text-right">
            <Button variant="ghost" className="p-2">
              <Edit />
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
