'use client'
import { formattedMoney, unformattedMoney } from '@/functions/formattedMoney'
import { ProductProps } from '@/interfaces/products'
import { api } from '@/services/axios/api'
import { useQuery } from '@tanstack/react-query'
import { Dispatch, ReactNode, SetStateAction, createContext, useCallback, useEffect, useState } from 'react'

interface ProductsContextData {
  productsItems: ProductProps[]
  setProductsItems: Dispatch<SetStateAction<ProductProps[]>>
  productID: string
  setProductID: Dispatch<SetStateAction<string>>
  isLoading: boolean
  isRefetching: boolean
  productSelected?: ProductProps
  setProductSelected: Dispatch<SetStateAction<ProductProps | undefined>>
  counter: number
  setCounter: Dispatch<SetStateAction<number>>
  noteProducts: ProductProps[]
  setNoteProducts: Dispatch<SetStateAction<ProductProps[]>>
  payment: string
  setPayment: Dispatch<SetStateAction<string>>

  handleAddProductNote: () => void
}

interface ProductsProviderProps {
  children: ReactNode
}

export const ProductsContext = createContext({} as ProductsContextData)

export function ProductsProvider({ children }: ProductsProviderProps) {
  const [productsItems, setProductsItems] = useState<ProductProps[]>([])
  const [productID, setProductID] = useState('')
  const [productSelected, setProductSelected] = useState<ProductProps>()
  const [counter, setCounter] = useState(1)
  const [noteProducts, setNoteProducts] = useState<ProductProps[]>([])
  const [payment, setPayment] = useState<string>('')

  const SelectingProduct = useCallback(() => {
    const data = productsItems.find((product) => product.id === productID && product)
    setProductSelected(data)
  }, [productID, productsItems])

  useEffect(() => {
    SelectingProduct()
  }, [SelectingProduct])

  const { isLoading, isRefetching } = useQuery({
    queryKey: ['products-sales'],
    queryFn: async () => {
      const { data } = await api.get('stock')
      setProductsItems(data.data)
      return data
    }
  })

  function handleAddProductNote() {
    setNoteProducts((prevItems) => [
      ...prevItems,
      {
        id: productSelected!.id,
        name: productSelected!.name,
        value: formattedMoney(String(unformattedMoney(productSelected!.value) * counter)),
        qtd: counter,
        photo: productSelected!.photo
      }
    ])

    setCounter(1)
  }

  return (
    <ProductsContext.Provider
      value={{
        productsItems,
        setProductsItems,
        productID,
        setProductID,
        isLoading,
        isRefetching,
        productSelected,
        setProductSelected,
        counter,
        setCounter,
        noteProducts,
        setNoteProducts,
        payment,
        setPayment,
        handleAddProductNote
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}
