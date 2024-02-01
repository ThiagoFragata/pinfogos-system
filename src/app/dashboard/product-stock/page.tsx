import { ButtonRedirect } from '@/components/atoms/ButtonRedirect'
import { SelectSearchProducts } from '@/components/molecules/SelectSearchProducts'
import { Cards } from '@/components/organisms/Cards'
import { StockProducts } from '@/components/organisms/StockProducts'

export default function ProductStock() {
  return (
    <div>
      <Cards />
      <div className="flex gap-4 my-8">
        <SelectSearchProducts />
        <ButtonRedirect label="Adicionar" url="/dashboard/product-stock/add-product" />
      </div>

      <StockProducts />
    </div>
  )
}
