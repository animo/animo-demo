import { NextRequest, NextResponse } from 'next/server'
import { getConnectionById } from '@/api/ConnectionApi'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const connection = await getConnectionById(params.id)
    
    return NextResponse.json(connection)
  } catch (error) {
    console.error('Error getting connection:', error)
    return NextResponse.json(
      { error: 'Failed to get connection' },
      { status: 500 }
    )
  }
}