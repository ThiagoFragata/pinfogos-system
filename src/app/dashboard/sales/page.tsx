import { SelectProduct } from '@/components/molecules/SelectProduct'
import { AddProductShopCar } from '@/components/organisms/AddProductShopCar'
import { TableProducts } from '@/components/organisms/TableProducts'

export default function Sales() {
  return (
    <div className="flex flex-col justify-between min-h-[80svh] gap-8 mt-8 dark:border border-neutral-950 md:flex-row">
      <div className="flex flex-col flex-1 gap-8">
        <SelectProduct />

        <AddProductShopCar />
      </div>

      <TableProducts />
    </div>
  )
}
