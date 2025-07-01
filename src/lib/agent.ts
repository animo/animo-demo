import type { InitConfig } from '@aries-framework/core'
import {
  AutoAcceptProof,
  ConnectionInvitationMessage,
  LogLevel,
  Agent,
  AutoAcceptCredential,
  HttpOutboundTransport,
  WsOutboundTransport,
} from '@aries-framework/core'
import { agentDependencies, HttpInboundTransport } from '@aries-framework/node'
import { Container } from 'typedi'

import { CredDefService } from './server/controllers/CredDefService'
import { AgentCleanup } from './server/utils/AgentCleanup'
import { TestLogger } from './server/utils/logger'
import { BCOVRIN_TEST_GENESIS } from './server/utils/utils'

const logger = new TestLogger(process.env.NODE_ENV ? LogLevel.error : LogLevel.debug)

let agent: Agent | null = null
let credDefService: CredDefService | null = null
let agentCleanupJob: any = null

export async function getAgent(): Promise<Agent> {
  if (agent) {
    return agent
  }

  const endpoint = process.env.AGENT_ENDPOINT || 'http://localhost:3000'
  const agentConfig: InitConfig = {
    label: 'Animo',
    walletConfig: {
      id: 'Animo Solutions',
      key: process.env.AGENT_WALLET_KEY ?? 'Animo',
    },
    indyLedgers: [
      {
        id: 'BCOVRIN_TEST_GENESIS',
        genesisTransactions: BCOVRIN_TEST_GENESIS,
        isProduction: false,
      },
    ],
    logger: logger,
    publicDidSeed: process.env.AGENT_PUBLIC_DID_SEED,
    endpoints: [endpoint],
    autoAcceptConnections: true,
    autoAcceptCredentials: AutoAcceptCredential.ContentApproved,
    autoAcceptProofs: AutoAcceptProof.ContentApproved,
    useLegacyDidSovPrefix: true,
  }

  const httpInbound = new HttpInboundTransport({ port: 5001 })

  agent = new Agent(agentConfig, agentDependencies)

  agent.registerInboundTransport(httpInbound)
  agent.registerOutboundTransport(new HttpOutboundTransport())
  agent.registerOutboundTransport(new WsOutboundTransport())

  await agent.initialize()

  credDefService = new CredDefService(agent)
  Container.set(CredDefService, credDefService)

  agentCleanupJob = AgentCleanup(agent)
  agentCleanupJob.start()

  return agent
}

export async function getCredDefService(): Promise<CredDefService> {
  if (!credDefService) {
    await getAgent()
  }
  return credDefService!
}

export function getAgentCleanupJob() {
  return agentCleanupJob
}