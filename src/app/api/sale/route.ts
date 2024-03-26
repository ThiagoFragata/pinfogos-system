import { NoteProps } from '@/interfaces/sales'
import { PrismaClient } from '@prisma/client'
import { ObjectId } from 'mongodb'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  const body: NoteProps = await req.json()

  try {
    if (body.noteProducts && Array.isArray(body.noteProducts)) {
      const result = await prisma.$transaction(async (transaction) => {
        const user = await transaction.user.findUnique({
          where: {
            uid: body.userID
          },
          select: {
            id: true
          }
        })

        if (!user) {
          console.log(`Nenhum usuário encontrado para o UID ${body.userID}`)
          throw new Error('Usuário sem permissão/inexistente')
        }

        const updateProductPromises = body.noteProducts.map((product) => {
          return transaction.product.update({
            where: { id: product.id },
            data: {
              qtd: {
                decrement: product.qtd
              }
            }
          })
        })

        await Promise.all(updateProductPromises)

        const newNote = await transaction.note.create({
          data: {
            userId: new ObjectId(user.id).toString(),
            amount: body.amount,
            amountTaxe: body.amountTaxes
          }
        })

        const sales = body.noteProducts.map((sale) => {
          return {
            qtd: sale.qtd,
            productID: sale.id,
            value: sale.value,
            noteId: new ObjectId(newNote.id).toString(),
            userId: new ObjectId(user.id).toString()
          }
        })

        await transaction.sale.createMany({
          data: sales
        })

        return { message: 'Venda registrada' }
      })

      return NextResponse.json(result, { status: 200 })
    } else {
      console.error('body.sales não é um array ou é indefinido.')
      throw new Error('Erro ao efetuar a venda, tente novamente!')
    }
  } catch (error: any) {
    console.error(error)
    return NextResponse.json({ message: error.message }, { status: 400 })
  } finally {
    await prisma.$disconnect()
  }
}
