import { ButtonDefault } from '@/components/atoms/ButtonDefault'
import { Card } from '@/components/atoms/Card'
import { SelectSearch } from '@/components/molecules/SelectSearch'
import { StockProducts } from '@/components/organisms/StockProducts'

export default function ProductStock() {
  return (
    <div>
      <div className="flex gap-4 my-8">
        <Card subtitle={'Entradas'} title={'+14'} description={'Quantidade adicionado'} />
        <Card subtitle={'Saídas'} title={'+12'} description={'Quantidade retirada'} />
        <Card subtitle={'Total'} title={'14'} description={'Quantidade total'} />
        <Card subtitle={'Total'} title={'R$142,00'} description={'Saldo total'} />
      </div>

      <div className="flex gap-4 mb-8">
        <SelectSearch placeholder="Digite ou pesquise um produto" />
        <ButtonDefault label="Novo produto" />
      </div>

      <StockProducts />
    </div>
  )
}
