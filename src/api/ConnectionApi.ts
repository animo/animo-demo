import { DidCommInvitationsService, DidCommConnectionsService, getProjectId } from '@/lib/paradym'

export const createOobInvitation = async (agentName?: string, agentImageUrl?: string) => {
  const projectId = getProjectId()
  
  const response = await DidCommInvitationsService.createConnectionInvitation({
    path: { projectId },
    body: {
      reusable: false,
      goal: {
        description: agentName || 'Connect with Animo Demo',
        code: 'p2p-messaging'
      }
      // Note: Paradym doesn't have direct imageUrl support in the same way
      // This would need to be handled differently or set in the project profile
    },
  })
  
  return response.data
}

export const createLegacyInvitation = async (agentName?: string, agentImageUrl?: string) => {
  // Paradym doesn't distinguish between legacy and new invitations in the same way
  // Using the same method as createOobInvitation
  return createOobInvitation(agentName, agentImageUrl)
}

export const getConnectionById = async (connectionId: string) => {
  const projectId = getProjectId()
  
  const response = await DidCommConnectionsService.getConnection({
    path: {
      projectId,
      didcommConnectionId: connectionId,
    },
  })
  
  return response.data
}

export const getConnectionByOutOfBandId = async (outOfBandId: string) => {
  const projectId = getProjectId()
  
  // Paradym allows filtering connections by invitation ID
  const response = await DidCommConnectionsService.getAllConnections({
    path: { projectId },
    query: {
      'filter[didcommInvitationId]': outOfBandId,
    },
  })
  
  return response.data
}
