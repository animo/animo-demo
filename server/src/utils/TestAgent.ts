import type { InitConfig } from '@aries-framework/core'

import { AutoAcceptCredential, Agent, HttpOutboundTransport } from '@aries-framework/core'
import { agentDependencies, HttpInboundTransport } from '@aries-framework/node'
import { startServer } from '@aries-framework/rest'

import { BCOVRIN_TEST_GENESIS } from './utils'

const PORT = 9000

const agentConfig: InitConfig = {
  label: 'Animo Test Agent',
  walletConfig: {
    id: 'Animo Test Agent',
    key: 'Animo Test Agent',
  },
  indyLedgers: [
    {
      id: 'BCOVRIN_TEST_GENESIS',
      genesisTransactions: BCOVRIN_TEST_GENESIS,
      isProduction: false,
    },
  ],
  publicDidSeed: 'qPa9E2iIwV2Sh37aqEj3LS3oLjZhiu5B',
  endpoints: ['http://localhost:9001'],
  autoAcceptConnections: true,
  autoAcceptCredentials: AutoAcceptCredential.ContentApproved,
  useLegacyDidSovPrefix: true,
  connectionImageUrl: 'https://i.imgur.com/g3abcCO.png',
}

const agent = new Agent(agentConfig, agentDependencies)

const httpInbound = new HttpInboundTransport({
  port: 9001,
})

agent.registerInboundTransport(httpInbound)

agent.registerOutboundTransport(new HttpOutboundTransport())

const runTestAgent = async () => {
  await agent.initialize()

  await startServer(agent, {
    port: PORT,
  })

  // eslint-disable-next-line no-console
  console.log(`Test agent online at port ${PORT}`)
}

runTestAgent()
