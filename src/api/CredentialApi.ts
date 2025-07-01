import type { CredentialData } from '../slices/types'
import { apiCall } from './BaseUrl'

export const issueCredential = async (
  connectionId: string,
  data: CredentialData,
  protocolVersion: 'v1' | 'v2'
) => {
  const response = await apiCall(`/credentials/offer-credential`, {
    method: 'POST',
    body: JSON.stringify({
      protocolVersion: protocolVersion,
      connectionId: connectionId,
      credentialFormats: {
        indy: {
          credentialDefinitionId: data.credentialDefinitionId,
          attributes: data.attributes,
        },
      },
    }),
  })
  return response.json()
}

export const getDemoCredentialsByConnectionId = async (connectionId: string) => {
  const response = await apiCall(`/demo/credentials/${connectionId}`)
  return response.json()
}

export const getCredentialById = async (credentialId: string) => {
  const response = await apiCall(`/credentials/${credentialId}`)
  return response.json()
}

export const deleteCredentialById = async (credentialId: string) => {
  const response = await apiCall(`/credentials/${credentialId}`, {
    method: 'DELETE',
  })
  return response.json()
}
