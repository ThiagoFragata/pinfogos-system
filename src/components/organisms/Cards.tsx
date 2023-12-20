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
      const prod = parseFloat(product?.value.replace('R$', '').replace(',', '.'))
      const qtd = product.qtd
      return prod * qtd
    })

    const some = someProduct?.reduce((total, item) => total + item, 0)
    return formattedMoney(String(some))
  }

  return (
    <div className="flex gap-4 my-8">
      <Card
        subtitle="Produtos cadastrados"
        title={products?.length.toString()}
        description="Quantidade total"
        loading={loading}
      />
      <Card subtitle="Valor Bruto" title={some()} description="Saldo total do estoque" loading={loading} />
    </div>
  )
}
