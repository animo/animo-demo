/* eslint-disable no-console */
import type { Agent } from '@aries-framework/core'

import { CronJob } from 'cron'

export const AgentCleanup = (agent: Agent) => {
  // “At 05:00 on Sunday.”
  return new CronJob('0 5 * * 0', () => {
    console.log('Starting cleanup')
    agent.connections.getAll().then((connections) => {
      connections.map((connection) => agent.connections.deleteById(connection.id))
    })
    agent.credentials.getAll().then((credentials) => {
      credentials.map((credential) => agent.credentials.deleteById(credential.id))
    })
    agent.proofs.getAll().then((proofs) => {
      proofs.map((proof) => agent.proofs.deleteById(proof.id))
    })
    console.log('Cleanup completed')
  })
}
