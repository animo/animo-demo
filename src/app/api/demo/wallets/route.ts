import { NextRequest, NextResponse } from 'next/server'

import { Wallets } from '@/lib/server/content/misc/Wallets'

export async function GET() {
  try {
    return NextResponse.json(Wallets)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch wallets' }, { status: 500 })
  }
}