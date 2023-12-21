import { ButtonBack } from '@/components/atoms/ButtonBack'
import EditProductForm from '@/components/organisms/EditProductForm'
import { ProductProps } from '@/interfaces/products'
import { api } from '@/services/axios/api'

export default async function EditProduct({ params }: { params: { slug: string } }) {
  const { data } = await api.get<ProductProps>(`product?product-id=${params.slug}`)

  return (
    <div>
      <div className="flex gap-2 items-center">
        <ButtonBack />
        <div className="my-8">
          <h1 className="font-bold text-xl">{data.name}</h1>
          <p>Editar produto</p>
        </div>
      </div>

      <EditProductForm product={data} />
    </div>
  )
}
