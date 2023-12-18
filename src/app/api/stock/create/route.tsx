import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()

type stockType = {
  name: string
  qtd: number
  value: string
  photo?: string
}

export async function POST(req: NextRequest) {
  const body: stockType = await req.json()

  const res = await prisma.product
    .create({
      data: body
    })
    .catch(async (e) => {
      console.error(e.message)
      process.exit(1)
    })
    .finally(async () => {
      await prisma.$disconnect()
    })

  return NextResponse.json({ data: res }, { status: 200 })
}
