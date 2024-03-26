'use client'
import { ButtonBack } from '@/components/atoms/ButtonBack'
import EditProductForm from '@/components/organisms/EditProductForm'
import { ProductProps } from '@/interfaces/products'
import { api } from '@/services/axios/api'
import { Loader2 } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

export default function EditProduct({ params }: { params: { slug: string } }) {
  const [productItens, setProductItens] = useState<ProductProps>()

  const getProductItems = useCallback(async () => {
    const { data } = await api.get<ProductProps>(`product?product-id=${params.slug}`)
    setProductItens(data)
  }, [params.slug])

  useEffect(() => {
    getProductItems()
  }, [getProductItems])

  return (
    <div>
      {!productItens && (
        <div className="flex flex-col mt-[25%] translate-y-[-25%] items-center justify-center gap-4">
          <Loader2 className="animate-spin" />
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-lg font-bold">Carregando dados do produto</h1>
            <p className="font-light">Aguarde alguns instantes, enquanto buscamos os dados do produto</p>
          </div>
        </div>
      )}

      {productItens && (
        <>
          <div className="flex items-center gap-2">
            <ButtonBack />
            <div className="my-8">
              <h1 className="text-xl font-bold">{productItens.name}</h1>
              <p>Editar produto</p>
            </div>
          </div>

          <EditProductForm product={productItens} />
        </>
      )}
    </div>
  )
}
