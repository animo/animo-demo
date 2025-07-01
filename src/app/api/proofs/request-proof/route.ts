import { NextRequest, NextResponse } from 'next/server'
import { createProofRequest } from '@/api/ProofApi'
import type { ProofAttribute, ProofPredicateInfo } from '@/slices/types'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { connectionId, proofRequestOptions, comment } = body
    
    // Transform to our internal format
    const proofRequestData = {
      connectionId,
      attributes: Object.values(proofRequestOptions?.requestedAttributes || {}) as ProofAttribute[],
      predicates: Object.values(proofRequestOptions?.requestedPredicates || {}) as ProofPredicateInfo[],
      requestOptions: {
        name: proofRequestOptions?.name,
        comment,
      },
    }
    
    const result = await createProofRequest(proofRequestData)
    
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error creating proof request:', error)
    return NextResponse.json(
      { error: 'Failed to create proof request' },
      { status: 500 }
    )
  }
}