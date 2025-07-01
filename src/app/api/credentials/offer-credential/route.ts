import { NextRequest, NextResponse } from 'next/server'
import { issueCredential } from '@/api/CredentialApi'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { protocolVersion, connectionId, credentialFormats } = body
    
    // Transform the Aries Framework format to our internal format
    const credentialData = {
      id: 'temp-id',
      name: 'Credential',
      icon: '',
      credentialDefinitionId: credentialFormats?.indy?.credentialDefinitionId || '',
      attributes: credentialFormats?.indy?.attributes || [],
    }
    
    const result = await issueCredential(connectionId, credentialData, protocolVersion)
    
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error issuing credential:', error)
    return NextResponse.json(
      { error: 'Failed to issue credential' },
      { status: 500 }
    )
  }
}