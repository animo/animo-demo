import type { CredentialData } from '../slices/types'
import { DidCommIssuanceService, getProjectId } from '@/lib/paradym'

export const issueCredential = async (
  connectionId: string,
  data: CredentialData,
  protocolVersion: 'v1' | 'v2'
) => {
  const projectId = getProjectId()
  
  // For Paradym, we create an offer using a credential template
  const response = await DidCommIssuanceService.createOffer({
    path: { projectId },
    body: {
      credential: {
        credentialTemplateId: data.credentialDefinitionId, // Assuming this maps to template ID
        attributes: data.attributes?.reduce((acc, attr) => {
          acc[attr.name] = attr.value
          return acc
        }, {} as Record<string, string | number>) || {},
      },
      goal: {
        description: `Issue ${data.name} credential`,
        code: 'issue-vc'
      },
      didcommConnectionId: connectionId,
    },
  })
  
  return response.data
}

export const getDemoCredentialsByConnectionId = async (connectionId: string) => {
  const projectId = getProjectId()
  
  // Get all issuance sessions for the project (Paradym doesn't support filtering by connection ID directly)
  const response = await DidCommIssuanceService.getAllIssuanceSessions({
    path: { projectId },
    query: {
      // Note: Paradym API doesn't support filtering by didcommConnectionId for issuance sessions
      // We would need to filter client-side or find an alternative approach
    },
  })
  
  // Filter client-side for the specific connection
  const filteredData = {
    ...response,
    data: response.data.data.filter((issuance: any) => 
      issuance.didcommConnectionId === connectionId
    )
  }
  
  return filteredData
}

export const getCredentialById = async (credentialId: string) => {
  const projectId = getProjectId()
  
  const response = await DidCommIssuanceService.getIssuanceSession({
    path: {
      projectId,
      didcommIssuanceId: credentialId,
    },
  })
  
  return response.data
}

export const deleteCredentialById = async (credentialId: string) => {
  // Paradym doesn't have a delete method for issuance sessions in the current API
  // This would need to be implemented differently or handled at the application level
  throw new Error('Delete credential not supported in Paradym API')
}
