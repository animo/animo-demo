import { NextRequest, NextResponse } from 'next/server'
import { createOOBProofRequest } from '@/api/ProofApi'
import type { ProofAttribute, ProofPredicateInfo } from '@/slices/types'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { proofRequestOptions, comment } = body
    
    // Transform to our internal format
    const proofRequestData = {
      connectionId: '', // Not needed for OOB
      attributes: Object.values(proofRequestOptions?.requestedAttributes || {}) as ProofAttribute[],
      predicates: Object.values(proofRequestOptions?.requestedPredicates || {}) as ProofPredicateInfo[],
      requestOptions: {
        name: proofRequestOptions?.name,
        comment,
      },
    }
    
    const result = await createOOBProofRequest(proofRequestData)
    
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error creating OOB proof request:', error)
    return NextResponse.json(
      { error: 'Failed to create OOB proof request' },
      { status: 500 }
    )
  }
}