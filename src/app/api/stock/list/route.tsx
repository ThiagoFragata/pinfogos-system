import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
  const res = await prisma.product
    .findMany()
    .catch(async (e) => {
      console.error(e.message)
      process.exit(1)
    })
    .finally(async () => {
      await prisma.$disconnect()
    })

  return NextResponse.json({ data: res }, { status: 200 })
}
