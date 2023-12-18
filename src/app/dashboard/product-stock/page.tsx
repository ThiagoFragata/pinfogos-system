'use client'
import { ButtonDefault } from '@/components/atoms/ButtonDefault'
import { SelectSearchProducts } from '@/components/molecules/SelectSearchProducts'
import { Cards } from '@/components/organisms/Cards'
import { StockProducts } from '@/components/organisms/StockProducts'
import { ProductProps } from '@/interfaces/products'
import { api } from '@/services/axios/api'
import { useQuery } from '@tanstack/react-query'

export default function ProductStock() {
  const { data, isLoading, isRefetching } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data } = await api.get('stock/list')
      return data
    }
  })

  let productsItems: ProductProps[] = []
  productsItems = data?.data

  return (
    <div>
      <Cards products={productsItems} loading={isLoading} />

      <div className="flex gap-4 mb-8">
        <SelectSearchProducts products={productsItems} loading={isLoading} refetch={isRefetching} />

        <ButtonDefault label="Novo produto" />
      </div>

      <StockProducts products={productsItems} loading={isLoading} refetch={isRefetching} />
    </div>
  )
}
