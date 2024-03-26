export function formattedMoney(value: string) {
  return (Number(value.replace(/\D/g, '')) / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
}

export function unformattedMoney(value: string): number {
  const numericValue = value.replace(/\D/g, '')
  return Number(numericValue)
}
