import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ message: 'Seja bem-vindo a API Pinfogos' }, { status: 200 })
}
