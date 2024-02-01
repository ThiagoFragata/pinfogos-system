export interface SaleProps {
  id: string
  qtd: number
  value: string
}

export interface NoteProps {
  userID: string
  amount: string
  amountTaxes: string
  noteProducts: SaleProps[]
}
