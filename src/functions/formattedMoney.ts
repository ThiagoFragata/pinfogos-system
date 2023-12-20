export function formattedMoney(value: string): string {
  return (Number(value.replace(/\D/g, '')) / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
}

// Moeda
// export const unMaskAmount = (value: string) => {
//   return typeof value === 'string' ? value : Number(value.replace(/\D/g, '')) / 100
// }
