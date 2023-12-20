'use client'
import { ButtonRedirect } from '@/components/atoms/ButtonRedirect'
import { SelectSearchProducts } from '@/components/molecules/SelectSearchProducts'
import { StockProducts } from '@/components/organisms/StockProducts'
import { ProductProps } from '@/interfaces/products'
import { api } from '@/services/axios/api'
import { useQuery } from '@tanstack/react-query'

export default function ProductStock() {
  const { data, isLoading, isRefetching } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data } = await api.get('stock')
      return data
    }
  })

  let productsItems: ProductProps[] = []
  productsItems = data?.data

  return (
    <div>
      <div className="flex gap-4 my-8">
        <SelectSearchProducts products={productsItems} loading={isLoading} refetch={isRefetching} />
        <ButtonRedirect label="Adicionar" url="/dashboard/product-stock/add-product" />
      </div>

      <StockProducts products={productsItems} loading={isLoading} />
    </div>
  )
}
