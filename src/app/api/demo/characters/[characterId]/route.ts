import { NextRequest, NextResponse } from 'next/server'

import characters from '@/lib/server/content/Characters'

export async function GET(
  request: NextRequest,
  { params }: { params: { characterId: string } }
) {
  try {
    const character = characters.find((c) => c.id === params.characterId)
    
    if (!character) {
      return NextResponse.json({ error: 'Character not found' }, { status: 404 })
    }

    return NextResponse.json(character)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch character' }, { status: 500 })
  }
}