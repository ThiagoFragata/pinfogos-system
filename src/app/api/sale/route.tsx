import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()

interface SaleProps {
  id: string
  qtd: number
  value: string
}

interface NoteProps {
  userID: string
  amount: string
  amountTaxes: string
  noteProducts: SaleProps[]
}

export async function POST(req: NextRequest) {
  const body: NoteProps = await req.json()

  try {
    if (body.noteProducts && Array.isArray(body.noteProducts)) {
      const user = await prisma.user.findUnique({
        where: {
          uid: body.userID
        },
        select: {
          id: true
        }
      })

      if (user) {
        body.noteProducts.map(async (product) => {
          await prisma.product.update({
            where: { id: product.id },
            data: {
              qtd: {
                decrement: product.qtd
              }
            }
          })
        })

        const newNote = await prisma.note.create({
          data: {
            userId: user.id,
            amount: body.amount,
            amountTaxe: body.amountTaxes
          }
        })

        const sales = body.noteProducts.map((sale) => {
          return {
            qtd: sale.qtd,
            productID: sale.id,
            value: sale.value,
            noteId: newNote.id,
            userId: user.id
          }
        })

        await prisma.sale.createMany({
          data: sales
        })
      } else {
        console.log(`Nenhum usuário encontrado para o UID ${body.userID}`)
        throw new Error('Usuário sem permissão/inexistente')
      }
    } else {
      console.error('body.sales não é um array ou é indefinido.')
      throw new Error('Erro ao efetuar a venda, tente novamente!')
    }
  } catch (error) {
    console.error(error)
    return error
  } finally {
    await prisma.$disconnect()
  }

  return NextResponse.json({ message: 'OK' }, { status: 200 })
}
