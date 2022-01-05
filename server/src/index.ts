import type { InitConfig } from '@aries-framework/core'
import type { Express } from 'express'

import {
  ConnectionInvitationMessage,
  LogLevel,
  Agent,
  AutoAcceptCredential,
  HttpOutboundTransport,
} from '@aries-framework/core'
import { JsonEncoder } from '@aries-framework/core/build/utils/JsonEncoder'
import { agentDependencies, HttpInboundTransport } from '@aries-framework/node'
import { startServer } from '@aries-framework/rest'
import { static as stx } from 'express'
import { connect } from 'ngrok'
import { createExpressServer, useContainer } from 'routing-controllers'
import { Container } from 'typedi'

import { CredDefService } from './controllers/CredDefService'
import { TestLogger } from './logger'
import { AgentCleanup } from './utils/AgentCleanup'
import { BCOVRIN_TEST_GENESIS } from './utils/utils'

const run = async () => {
  const logger = new TestLogger(process.env.NODE_ENV ? LogLevel.error : LogLevel.debug)

  const endpoint = process.env.AGENT_ENDPOINT ?? (await connect(5001))
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
    useLegacyDidSovPrefix: true,
    connectionImageUrl: 'https://i.imgur.com/g3abcCO.png',
  }

  const agent = new Agent(agentConfig, agentDependencies)

  const httpInbound = new HttpInboundTransport({
    port: 5001,
  })

  agent.registerInboundTransport(httpInbound)

  agent.registerOutboundTransport(new HttpOutboundTransport())

  await agent.initialize()

  const app: Express = createExpressServer({
    controllers: [__dirname + '/controllers/**/*.ts', __dirname + '/controllers/**/*.js'],
    cors: true,
    routePrefix: '/demo',
  })

  httpInbound.app.get('/', async (req, res) => {
    // eslint-disable-next-line no-console
    if (typeof req.query.c_i === 'string') {
      const invitation = await ConnectionInvitationMessage.fromUrl(req.url.replace('d_m=', 'c_i='))
      res.send(invitation.toJSON())
    }
    if (typeof req.query.d_m === 'string') {
      const base64 = req.query.d_m.split('?')[0]
      const proof = JsonEncoder.fromBase64(base64)
      res.send(proof)
    }
    if (typeof req.query.id === 'string') {
      const proof = await agent.proofs.getById(req.query.id)

      let message = ''
      if (proof.requestMessage) {
        message = JsonEncoder.toBase64URL(proof.requestMessage.toJSON())
      }

      res.redirect(agent.config.endpoints[0] + '/?d_m=' + message)
    }
  })

  app.use('/public', stx(__dirname + '/public'))

  const credDefService = new CredDefService(agent)
  useContainer(Container)
  Container.set(CredDefService, credDefService)

  const job = AgentCleanup(agent)
  job.start()

  await startServer(agent, {
    port: 5000,
    app: app,
  })
}

run()
