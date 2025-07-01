import { NextRequest, NextResponse } from 'next/server'

import characters from '@/lib/server/content/Characters'

export async function GET() {
  try {
    return NextResponse.json(characters)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch characters' }, { status: 500 })
  }
}