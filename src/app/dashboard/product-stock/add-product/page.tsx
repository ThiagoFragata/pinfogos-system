import { ButtonBack } from '@/components/atoms/ButtonBack'
import CreateProductsForm from '@/components/organisms/CreateProductsForm'

export default function AddProduct() {
  return (
    <div>
      <div className="flex items-center gap-2">
        <ButtonBack />
        <div className="my-8">
          <h1 className="text-xl font-bold">Adicionar um produto</h1>
          <p>Cadastre um produto</p>
        </div>
      </div>

      <CreateProductsForm />
    </div>
  )
}
