import { NextRequest, NextResponse } from 'next/server'
import { createOobInvitation } from '@/api/ConnectionApi'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { autoAcceptConnection, label, imageUrl } = body
    
    const invitation = await createOobInvitation(label, imageUrl)
    
    return NextResponse.json(invitation)
  } catch (error) {
    console.error('Error creating OOB invitation:', error)
    return NextResponse.json(
      { error: 'Failed to create invitation' },
      { status: 500 }
    )
  }
}