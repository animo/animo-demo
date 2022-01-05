import type { CredentialData } from '../slices/types'
import type { AxiosResponse } from 'axios'

import { apiCall } from './BaseUrl'

export const issueCredential = async (connectionId: string, data: CredentialData): Promise<AxiosResponse> => {
  return apiCall.post(`/credentials/offer-credential`, {
    connectionId: connectionId,
    credentialDefinitionId: data.credentialDefinitionId,
    preview: {
      '@type': 'https://didcomm.org/issue-credential/1.0/credential-preview',
      attributes: data.attributes,
    },
  })
}

export const getDemoCredentialsByConnectionId = async (connectionId: string) => {
  return apiCall.get(`/demo/credentials/${connectionId}`)
}

export const getCredentialById = (credentialId: string): Promise<AxiosResponse> => {
  return apiCall.get(`/credentials/${credentialId}`)
}

export const deleteCredentialById = (credentialId: string): Promise<AxiosResponse> => {
  return apiCall.delete(`/credentials/${credentialId}`)
}
