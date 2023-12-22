'use client'

import { formattedMoney } from '@/functions/formattedMoney'
import { ProductProps } from '@/interfaces/products'
import { Card } from '../atoms/Card'

interface CardsProps {
  products: ProductProps[]
  loading: boolean
}

export function Cards({ products, loading }: CardsProps) {
  function Some() {
    const someProduct = products?.map((product) => {
      const prod = Number(product.value.replace(/\D/g, ''))
      const qtd = product.qtd
      return { amount: prod * qtd, qtd }
    })

    const someAmount = someProduct?.reduce((total, item) => total + item.amount, 0)
    const someQtd = someProduct?.reduce((total, item) => total + item.qtd, 0)

    return { amountTotal: formattedMoney(String(someAmount)), qtdTotal: someQtd }
  }

  return (
    <div className="flex gap-4 my-8">
      <Card subtitle="Produtos cadastrados" title={products?.length} description="Quantidade" loading={loading} />
      <Card subtitle="Total de itens estoque" title={Some().qtdTotal} description=" Total" loading={loading} />
      <Card subtitle="Valor Bruto" title={Some().amountTotal} description="Saldo" loading={loading} />
    </div>
  )
}
