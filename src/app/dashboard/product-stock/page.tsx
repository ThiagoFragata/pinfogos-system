'use client'
import { ButtonRedirect } from '@/components/atoms/ButtonRedirect'
import { SelectSearchProducts } from '@/components/molecules/SelectSearchProducts'
import { Cards } from '@/components/organisms/Cards'
import { StockProducts } from '@/components/organisms/StockProducts'
import { ProductProps } from '@/interfaces/products'
import { api } from '@/services/axios/api'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export default function ProductStock() {
  const [productsItems, setProductsItems] = useState<ProductProps[]>([])
  const { isLoading, isRefetching } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data } = await api.get('stock')
      setProductsItems(data.data)
      return data
    }
  })

  return (
    <div>
      <Cards products={productsItems} loading={isLoading} />
      <div className="flex gap-4 my-8">
        <SelectSearchProducts
          products={productsItems}
          loading={isLoading}
          refetch={isRefetching}
          setProduct={setProductsItems}
        />
        <ButtonRedirect label="Adicionar" url="/dashboard/product-stock/add-product" />
      </div>

      <StockProducts products={productsItems} loading={isLoading} />
    </div>
  )
}
