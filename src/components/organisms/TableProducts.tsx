'use client'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { formattedMoney, unformattedMoney } from '@/functions/formattedMoney'
import { useProducts } from '@/hooks/useProducts'
import { useCallback, useEffect } from 'react'
import { Card } from '../atoms/Card'
import { SelectForm } from '../atoms/SelectForm'
import { Button } from '../ui/button'

export function TableProducts() {
  const { noteProducts, setNoteProducts, payment, handleSaleProducts, setPayment } = useProducts()

  const SomeNoteProduct = useCallback(() => {
    const someProduct = noteProducts?.map((product) => {
      const prod = Number(product.value.replace(/\D/g, ''))
      const qtd = product.qtd
      return { amount: prod, qtd }
    })

    const someAmount = someProduct?.reduce((total, item) => total + item.amount, 0)
    const someQtd = someProduct?.reduce((total, item) => total + item.qtd, 0)

    return { amountTotal: formattedMoney(String(someAmount)), qtdTotal: someQtd }
  }, [noteProducts])

  const ApplyTaxes = useCallback(() => {
    const subtotal = SomeNoteProduct()

    if (payment === 'cardDebit') {
      return formattedMoney(
        String(unformattedMoney(subtotal.amountTotal) + unformattedMoney(subtotal.amountTotal) * 0.03)
      )
    } else if (payment === 'cardCredit') {
      return formattedMoney(
        String(unformattedMoney(subtotal.amountTotal) + unformattedMoney(subtotal.amountTotal) * 0.05)
      )
    } else {
      return formattedMoney(String(unformattedMoney(subtotal.amountTotal)))
    }
  }, [SomeNoteProduct, payment])

  useEffect(() => {
    ApplyTaxes()
  }, [ApplyTaxes, payment])

  return (
    <div className="flex-1 flex flex-col gap-4">
      <div className="flex gap-4">
        <Card
          subtitle="Subtotal"
          title={SomeNoteProduct().amountTotal}
          description="Valor total dos produtos"
          loading={false}
        />
        <Card subtitle="Total" title={ApplyTaxes()} description="Valor total dos produtos + taxas" loading={false} />
      </div>

      <Table>
        <TableCaption>
          {noteProducts.length === 0 ? 'Nenhum item adicionado' : 'Produtos adicionado(s) a compra'}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="">Produto</TableHead>
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

      {noteProducts.length > 0 && (
        <div className="flex flex-col gap-4 mt-auto">
          <SelectForm />
          <div className="flex justify-between gap-4">
            <Button
              className="flex-1 flex flex-col items-start justify-start py-12 px-8 text-zinc-950 bg-rose-300 hover:bg-rose-500"
              variant="destructive"
              onClick={() => {
                setNoteProducts([])
                setPayment('')
              }}
            >
              <p className="font-bold">Cancelar</p>
              <small>Venda aberta</small>
            </Button>

            <Button
              disabled={!payment}
              onClick={() => handleSaleProducts(SomeNoteProduct().amountTotal, ApplyTaxes())}
              className="flex-1 flex flex-col items-start justify-start py-12 px-8 text-zinc-950 bg-emerald-300 hover:bg-emerald-500"
            >
              <p className="font-bold">Finalizar</p>
              <small>Venda</small>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
