'use client'
import { PDFGenerator } from '@/functions/PdfGenerator'
import { formattedMoney, unformattedMoney } from '@/functions/formattedMoney'
import { useProducts } from '@/hooks/useProducts'
import { useCallback, useEffect } from 'react'
import { Card } from '../atoms/Card'
import { SelectForm } from '../atoms/SelectForm'
import { Button } from '../ui/button'
import { ProductsNote } from './ProductsNote'

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
    <div className="flex flex-col flex-1 gap-4">
      <div id="pdf-content" className="flex flex-col">
        <div className="flex gap-4">
          <Card
            subtitle="Subtotal"
            title={SomeNoteProduct().amountTotal}
            description="Valor total dos produtos"
            loading={false}
          />
          <Card subtitle="Total" title={ApplyTaxes()} description="Valor total dos produtos + taxas" loading={false} />
        </div>

        <ProductsNote />
      </div>
      {noteProducts.length > 0 && (
        <div className="flex flex-col gap-4 mt-auto">
          <SelectForm />

          <div className="flex justify-between gap-4">
            <Button
              className="flex flex-col items-start justify-start flex-1 px-8 py-12 text-zinc-950 bg-amber-300 hover:bg-amber-500"
              variant="destructive"
              onClick={() => {
                PDFGenerator()
                setNoteProducts([])
                setPayment('')
              }}
            >
              <p className="font-bold">Exportar</p>
              <small>Gerar orçamento</small>
            </Button>

            <Button
              className="flex flex-col items-start justify-start flex-1 px-8 py-12 text-zinc-950 bg-rose-300 hover:bg-rose-500"
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
              onClick={() => {
                handleSaleProducts(SomeNoteProduct().amountTotal, ApplyTaxes())
                PDFGenerator()
              }}
              className="flex flex-col items-start justify-start flex-1 px-8 py-12 text-zinc-950 bg-emerald-300 hover:bg-emerald-500"
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
