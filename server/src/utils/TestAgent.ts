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
}

const agent = new Agent(agentConfig, agentDependencies)

const httpInbound = new HttpInboundTransport({
  port: 9001,
})

agent.registerInboundTransport(httpInbound)

agent.registerOutboundTransport(new HttpOutboundTransport())

const runTestAgent = async () => {
  await agent.initialize()

  await agent.connections.getAll().then((connections) => {
    connections.map((connection) => agent.connections.deleteById(connection.id))
  })
  await agent.credentials.getAll().then((credentials) => {
    credentials.map((credential) => agent.credentials.deleteById(credential.id))
  })
  await agent.proofs.getAll().then((proofs) => {
    proofs.map((proof) => agent.proofs.deleteById(proof.id))
  })

  await startServer(agent, {
    port: PORT,
  })

  // eslint-disable-next-line no-console
  console.log(`Test agent online at port ${PORT}`)
}

runTestAgent()
