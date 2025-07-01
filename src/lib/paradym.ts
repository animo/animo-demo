import { Paradym } from '@paradym/sdk'

const apiKey = process.env.PARADYM_API_KEY
const baseUrl = process.env.PARADYM_BASE_URL || 'https://api.paradym.id'

if (!apiKey) {
  throw new Error('PARADYM_API_KEY environment variable is required')
}

// Initialize the Paradym client (this sets up the global client config)
export const paradym = new Paradym({
  apiKey,
  baseUrl,
})

export const getProjectId = () => {
  const projectId = process.env.PARADYM_PROJECT_ID
  if (!projectId) {
    throw new Error('PARADYM_PROJECT_ID environment variable is required')
  }
  return projectId
}

// Export types from Paradym SDK for convenience
export type {
  DidcommConnection,
  DidcommInvitation,
  DidcommIssuance,
  DidcommVerification,
  DidcommCreateConnectionInvitationBody,
  DidcommIssuanceStatus,
  DidcommVerificationStatus,
} from '@paradym/sdk/build/generated/types.gen'

// Export service classes for direct use
export {
  DidCommConnectionsService,
  DidCommInvitationsService,
  DidCommIssuanceService,
  DidCommVerificationService,
  DidCommMessagingService,
  DidCommMediatorsService,
} from '@paradym/sdk/build/generated/sdk.gen'