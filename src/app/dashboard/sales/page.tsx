import { SelectProduct } from '@/components/molecules/SelectProduct'
import { AddProductShopCar } from '@/components/organisms/AddProductShopCar'
import { TableProducts } from '@/components/organisms/TableProducts'

export default function Sales() {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-8 mt-8 min-h-[80vh]">
      <div className="flex-1 flex flex-col gap-8">
        <SelectProduct />

        <AddProductShopCar />
      </div>

      <TableProducts />
    </div>
  )
}
