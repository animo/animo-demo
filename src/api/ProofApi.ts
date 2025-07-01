import type { ProofRequestData } from '../slices/types'
import { DidCommVerificationService, getProjectId } from '@/lib/paradym'

export const createProofRequest = async (data: ProofRequestData) => {
  const projectId = getProjectId()
  
  // For Paradym, we create a verification request using a presentation template
  const response = await DidCommVerificationService.createRequest({
    path: { projectId },
    body: {
      presentationTemplateId: 'default-template', // This would need to be configured properly
      goal: {
        description: data.requestOptions?.comment || 'Request credential verification',
        code: 'request-proof'
      },
      didcommConnectionId: data.connectionId,
    },
  })
  
  return response.data
}

export const createOOBProofRequest = async (data: ProofRequestData) => {
  const projectId = getProjectId()
  
  // For out-of-band proof requests, we create a request with an invitation
  const response = await DidCommVerificationService.createRequest({
    path: { projectId },
    body: {
      presentationTemplateId: 'default-template', // This would need to be configured properly
      goal: {
        description: data.requestOptions?.comment || 'Request credential verification',
        code: 'request-proof'
      },
      didcommInvitation: {
        createConnection: true
      },
    },
  })
  
  return response.data
}

export const getProofById = async (proofId: string) => {
  const projectId = getProjectId()
  
  const response = await DidCommVerificationService.getVerificationSession({
    path: {
      projectId,
      didcommVerificationId: proofId,
    },
  })
  
  return response.data
}

export const deleteProofById = async (proofId: string) => {
  // Paradym doesn't have a delete method for verification sessions in the current API
  // This would need to be implemented differently or handled at the application level
  throw new Error('Delete proof not supported in Paradym API')
}
