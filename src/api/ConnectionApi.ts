import { apiCall } from './BaseUrl'

export const createOobInvitation = async (agentName?: string, agentImageUrl?: string) => {
  const response = await apiCall('/oob/create-invitation', {
    method: 'POST',
    body: JSON.stringify({
      autoAcceptConnection: true,
      label: agentName,
      imageUrl: agentImageUrl,
    }),
  })
  return response.json()
}

export const createLegacyInvitation = async (agentName?: string, agentImageUrl?: string) => {
  const response = await apiCall('/oob/create-legacy-invitation', {
    method: 'POST',
    body: JSON.stringify({
      autoAcceptConnection: true,
      label: agentName,
      imageUrl: agentImageUrl,
    }),
  })
  return response.json()
}

export const getConnectionById = async (connectionId: string) => {
  const response = await apiCall(`/connections/${connectionId}`)
  return response.json()
}

export const getConnectionByOutOfBandId = async (outOfBandId: string) => {
  const response = await apiCall(`/connections?outOfBandId=${outOfBandId}`)
  return response.json()
}
