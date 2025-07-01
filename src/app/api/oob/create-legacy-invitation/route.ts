import { NextRequest, NextResponse } from 'next/server'
import { createLegacyInvitation } from '@/api/ConnectionApi'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { autoAcceptConnection, label, imageUrl } = body
    
    const invitation = await createLegacyInvitation(label, imageUrl)
    
    return NextResponse.json(invitation)
  } catch (error) {
    console.error('Error creating legacy invitation:', error)
    return NextResponse.json(
      { error: 'Failed to create invitation' },
      { status: 500 }
    )
  }
}