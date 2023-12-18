import { Card } from '@/components/atoms/Card'
import { SelectForm } from '@/components/atoms/SelectForm'
import { Counter } from '@/components/molecules/Counter'
// import { SelectSearch } from '@/components/molecules/SelectSearch'
import { TableProducts } from '@/components/organisms/TableProducts'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

export default function Sales() {
  return (
    <div className="flex justify-between gap-8 mt-8 min-h-[600px]">
      <div className="flex-1 flex flex-col justify-between">
        {/* <SelectSearch placeholder="Pesquise ou digite um produto" /> */}

        <div className="flex items-center justify-between my-8">
          <div>
            <p className="font-medium text-gray-500">Nome do produto</p>
            <h1 className="font-bold text-3xl">R$ 140,00</h1>
            <p className="mt-4 mb-2 text-sm">Quantidade</p>
            <Counter />
          </div>

          <Button className="px-6 py-8" variant="outline">
            <Check />
          </Button>
        </div>

        <div>
          <SelectForm />

          <div className="flex justify-between gap-4 mt-4">
            <Button
              className="flex-1 flex flex-col items-start justify-start py-12 px-8 text-zinc-950 bg-rose-300 hover:bg-rose-500"
              variant="destructive"
            >
              <p className="font-bold">Cancelar</p>
              <small>Venda aberta</small>
            </Button>
            <Button className="flex-1 flex flex-col items-start justify-start py-12 px-8 text-zinc-950 bg-emerald-300 hover:bg-emerald-500">
              <p className="font-bold">Finalizar</p>
              <small>Venda</small>
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-[600px] flex flex-col justify-between">
        <TableProducts />

        <div className="flex gap-4 mt-4">
          <Card subtitle="Subtotal" title="R$ 140,00" description="Valor total dos produtos" />
          <Card subtitle="Total" title="R$ 142,00" description="Valor total dos produtos + taxas" />
        </div>
      </div>
    </div>
  )
}
