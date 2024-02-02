'use client'
import { useProducts } from '@/hooks/useProducts'
import Loading from '../loading'
import { columns } from './columns'
import { DataTable } from './data-table'

export default function ProductStock() {
  const { productsItems, isLoading } = useProducts()

  return isLoading ? <Loading /> : <DataTable columns={columns} data={productsItems} />
}
