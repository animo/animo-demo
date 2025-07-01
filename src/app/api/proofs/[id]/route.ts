import { NextRequest, NextResponse } from 'next/server'
import { getProofById, deleteProofById } from '@/api/ProofApi'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const proof = await getProofById(params.id)
    
    return NextResponse.json(proof)
  } catch (error) {
    console.error('Error getting proof:', error)
    return NextResponse.json(
      { error: 'Failed to get proof' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const result = await deleteProofById(params.id)
    
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error deleting proof:', error)
    return NextResponse.json(
      { error: 'Failed to delete proof' },
      { status: 500 }
    )
  }
}