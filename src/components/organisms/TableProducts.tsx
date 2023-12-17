import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export function TableProducts() {
  return (
    <Table>
      <TableCaption>Nota de compra</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="">Produto</TableHead>
          <TableHead>Quantidade</TableHead>
          <TableHead className="text-right">Valor</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>12</TableCell>
          <TableCell className="text-right">R$250,00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV002</TableCell>
          <TableCell>12</TableCell>
          <TableCell className="text-right">R$250,00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV003</TableCell>
          <TableCell>12</TableCell>
          <TableCell className="text-right">R$250,00</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
