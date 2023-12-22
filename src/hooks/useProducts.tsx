import { ProductsContext } from '@/context/productsContext'
import { useContext } from 'react'

export function useProducts() {
  const context = useContext(ProductsContext)

  return context
}
