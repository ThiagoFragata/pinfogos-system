'use client'

import { formattedMoney } from '@/functions/formattedMoney'
import { ProductProps } from '@/interfaces/products'
import { Card } from '../atoms/Card'

interface CardsProps {
  products: ProductProps[]
  loading: boolean
}

export function Cards({ products, loading }: CardsProps) {
  function some() {
    const someProduct = products?.map((product) => {
      const prod = Number(product.value.replace(/\D/g, ''))
      // const prod = parseFloat(product?.value.replace('R$', '').replace(',', '.'))
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
      <Card subtitle="Quantidade de produtos" title={some().qtdTotal} description=" Total" loading={loading} />
      <Card subtitle="Valor Bruto" title={some().amountTotal} description="Saldo" loading={loading} />
    </div>
  )
}
