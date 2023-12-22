'use client'

import { formattedMoney } from '@/functions/formattedMoney'
import { useProducts } from '@/hooks/useProducts'
import { Card } from '../atoms/Card'

export function Cards() {
  const { productsItems, isLoading } = useProducts()

  function Some() {
    const someProduct = productsItems?.map((product) => {
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
      <Card
        subtitle="Produtos cadastrados"
        title={productsItems?.length}
        description="Quantidade"
        loading={isLoading}
      />
      <Card subtitle="Total de itens estoque" title={Some().qtdTotal} description=" Total" loading={isLoading} />
      <Card subtitle="Valor Bruto" title={Some().amountTotal} description="Saldo" loading={isLoading} />
    </div>
  )
}
