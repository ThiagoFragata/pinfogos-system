import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function PUT(req: NextRequest) {
  const productID = req.nextUrl.searchParams.get('product-id')

  const res = await prisma.product
    .findUnique({
      where: {
        id: productID!
      }
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
