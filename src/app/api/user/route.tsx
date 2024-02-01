import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  const body = await req.json()

  await prisma.user
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

  return NextResponse.json({ message: 'Usuário cadastrado' }, { status: 200 })
}
