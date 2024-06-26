import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useProducts } from '@/hooks/useProducts'

const payments = [
  {
    value: 'pix',
    label: 'Pix'
  },
  {
    value: 'money',
    label: 'Dinheiro'
  },
  {
    value: 'cardDebit',
    label: 'Cartão de Débito'
  },
  {
    value: 'cardCredit',
    label: 'Cartão de Crédito'
  }
]

export function SelectForm() {
  const { setPayment } = useProducts()

  return (
    <Select onValueChange={setPayment}>
      <SelectTrigger className="flex-1">
        <SelectValue placeholder="Forma de pagamento" />
      </SelectTrigger>

      <SelectContent>
        {payments.map((payment) => (
          <SelectItem key={payment.label} value={payment.value}>
            {payment.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
