import type { AxiosResponse } from 'axios'

import { apiCall } from './BaseUrl'

export const createOobInvitation = (agentName?: string, agentImageUrl?: string): Promise<AxiosResponse> => {
  return apiCall.post('/oob/create-invitation', {
    autoAcceptConnection: true,
    label: agentName,
    imageUrl: agentImageUrl,
  })
}

export const createLegacyInvitation = (agentName?: string, agentImageUrl?: string): Promise<AxiosResponse> => {
  return apiCall.post('/oob/create-legacy-invitation', {
    autoAcceptConnection: true,
    label: agentName,
    imageUrl: agentImageUrl,
  })
}

export const getConnectionById = (connectionId: string): Promise<AxiosResponse> => {
  return apiCall.get(`/connections/${connectionId}`)
}

export const getConnectionByOutOfBandId = (outOfBandId: string): Promise<AxiosResponse> => {
  return apiCall.get(`/connections?outOfBandId=${outOfBandId}`)
}
