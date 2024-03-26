import { ButtonBack } from '@/components/atoms/ButtonBack'
import CreateProductsForm from '@/components/organisms/CreateProductsForm'

export default function AddProduct() {
  return (
    <div>
      <div className="flex gap-2 items-center">
        <ButtonBack />
        <div className="my-8">
          <h1 className="font-bold text-xl">Adicionar um produto</h1>
          <p>Cadastre um produto</p>
        </div>
      </div>

      <CreateProductsForm />
    </div>
  )
}
