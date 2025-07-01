import { NextRequest, NextResponse } from 'next/server'
import { getCredentialById, deleteCredentialById } from '@/api/CredentialApi'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const credential = await getCredentialById(params.id)
    
    return NextResponse.json(credential)
  } catch (error) {
    console.error('Error getting credential:', error)
    return NextResponse.json(
      { error: 'Failed to get credential' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const result = await deleteCredentialById(params.id)
    
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error deleting credential:', error)
    return NextResponse.json(
      { error: 'Failed to delete credential' },
      { status: 500 }
    )
  }
}