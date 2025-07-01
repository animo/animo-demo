import { NextRequest, NextResponse } from 'next/server'
import { getDemoCredentialsByConnectionId } from '@/api/CredentialApi'

export async function GET(
  request: NextRequest,
  { params }: { params: { connectionId: string } }
) {
  try {
    const credentials = await getDemoCredentialsByConnectionId(params.connectionId)
    
    return NextResponse.json(credentials)
  } catch (error) {
    console.error('Error getting demo credentials:', error)
    return NextResponse.json(
      { error: 'Failed to get demo credentials' },
      { status: 500 }
    )
  }
}