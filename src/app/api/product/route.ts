import { ProductProps } from '@/interfaces/products'
import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  const body = await req.json()

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

export async function GET(req: NextRequest) {
  const productID = req.nextUrl.searchParams.get('product-id')

  const data: ProductProps | null = await prisma.product
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

  return NextResponse.json(data, { status: 200 })
}

export async function PUT(req: NextRequest) {
  const productID = req.nextUrl.searchParams.get('product-id')
  const body = await req.json()

  const data: ProductProps | null = await prisma.product
    .update({
      where: {
        id: productID!
      },
      data: body
    })
    .catch(async (e) => {
      console.error(e.message)
      process.exit(1)
    })
    .finally(async () => {
      await prisma.$disconnect()
    })

  await prisma.$disconnect()

  return NextResponse.json(data, { status: 200 })
}
