import { NextRequest, NextResponse } from 'next/server'
import { getConnectionByOutOfBandId } from '@/api/ConnectionApi'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const outOfBandId = searchParams.get('outOfBandId')
    
    if (!outOfBandId) {
      return NextResponse.json(
        { error: 'outOfBandId parameter is required' },
        { status: 400 }
      )
    }
    
    const connections = await getConnectionByOutOfBandId(outOfBandId)
    
    return NextResponse.json(connections)
  } catch (error) {
    console.error('Error getting connections:', error)
    return NextResponse.json(
      { error: 'Failed to get connections' },
      { status: 500 }
    )
  }
}