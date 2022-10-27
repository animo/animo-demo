import type { Event } from '../types/event'

import { ConnectionEventTypes, DidExchangeState } from '@aries-framework/core'

import { isConnectionEvent } from '../config/event'
import { webSocketConfig } from '../config/websocket'

// Demo Agent
const API_URL = Cypress.env('apiUrl')

// Extra test agent
const TEST_AGENT_URL = 'http://localhost:9000'

describe('Onboarding demo test using out of band invitation', () => {
  it('successfully completes school use case', () => {
    cy.visit('/')
    cy.get('[data-cy=try-demo-button]').click()

    const shortcut = Cypress.platform === 'darwin' ? 'command+k' : 'ctrl+k'
    cy.get('body').type(`{${shortcut}}`)
    cy.get('[data-cy=invitation-type]').click().get('[data-cy=invitation-type-oob]').click()

    cy.get('[data-cy=next-onboarding-step]').click()
    cy.get('[data-cy=use-wallet]').first().click()
    cy.get('[data-cy=small-button]').click()

    cy.get('[data-cy=select-char]').first().click()
    cy.intercept('POST', `${API_URL}/oob/create-invitation`).as('createInvitation')
    cy.get('[data-cy=next-onboarding-step]').click()

    cy.wait('@createInvitation').then((interception) => {
      const body = { invitationUrl: interception.response?.body.invitationUrl, autoAcceptConnection: true }

      const oobId = interception.response?.body.outOfBandRecord.id

      cy.request('POST', `${TEST_AGENT_URL}/oob/receive-invitation-url`, body)

      cy.streamRequest<Event>(webSocketConfig, {
        streamTimeout: 10000,
        // Waits for connection event with oobId and state is completed or response-sent
        takeWhileFn: (event) => {
          if (!isConnectionEvent(event)) return true

          return (
            event.payload.connectionRecord.outOfBandId !== oobId &&
            ![DidExchangeState.Completed, DidExchangeState.ResponseSent].includes(event.payload.connectionRecord.state)
          )
        },
      }).then((results) => {
        const length = (results && results.length) || 0
        const result = results && results[length - 1]

        expect(result).to.have.property('type', ConnectionEventTypes.ConnectionStateChanged)
      })
    })

    cy.intercept('POST', '/credentials/offer-credential').as('offerCredential')

    cy.get('[data-cy=next-onboarding-step]').click()

    cy.wait('@offerCredential').then((interception) => {
      const connectionId = interception.response?.body.connectionId
      const threadId = interception.response?.body.threadId

      cy.request('GET', `${TEST_AGENT_URL}/credentials/`).should((response) => {
        const testAgentRecord = response.body.find(
          (credentialRecord) => credentialRecord.threadId === threadId && credentialRecord.state === 'offer-received'
        )

        cy.request('POST', `${TEST_AGENT_URL}/credentials/${testAgentRecord.id}/accept-offer`)

        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(5000) // wait for the test agent request to be processed
        cy.request('GET', `${API_URL}/demo/credentials/${connectionId}`).should((resp) => {
          const cred = resp.body.find((credentialRecord) => credentialRecord.threadId === threadId)
          cy.wrap(cred).its('state').should('equal', 'done')
        })

        cy.get('[data-cy="next-onboarding-step"]').click()
      })
    })

    cy.get('[data-cy=next-onboarding-step]').click()
    cy.url().should('be.equal', `${Cypress.config('baseUrl')}/dashboard`)

    cy.get('[data-cy=select-use-case]').first().click()

    cy.get('[data-cy=start-container]')
    cy.get('[data-cy=small-button]').click()

    cy.wait('@createInvitation').then((interception) => {
      const body = { invitationUrl: interception.response?.body.invitationUrl, autoAcceptConnection: true }

      const oobId = interception.response?.body.outOfBandRecord.id

      cy.request('POST', `${TEST_AGENT_URL}/oob/receive-invitation-url`, body)

      cy.streamRequest<Event>(webSocketConfig, {
        streamTimeout: 10000,
        // Waits for connection event with oobId and state is completed or response-sent
        takeWhileFn: (event) => {
          if (!isConnectionEvent(event)) return true

          return (
            event.payload.connectionRecord.outOfBandId !== oobId &&
            ![DidExchangeState.Completed, DidExchangeState.ResponseSent].includes(event.payload.connectionRecord.state)
          )
        },
      }).then((results) => {
        const length = (results && results.length) || 0
        const result = results && results[length - 1]

        expect(result).to.have.property('type', ConnectionEventTypes.ConnectionStateChanged)
      })
    })

    cy.intercept('POST', `${API_URL}/proofs/request-proof`).as('createProof')

    cy.get('[data-cy=section')
    cy.get('[data-cy="small-button"]').click()

    cy.wait('@createProof').then((interception) => {
      const threadId = interception.response?.body.threadId
      cy.request('GET', `${TEST_AGENT_URL}/proofs/`).should((response) => {
        const record = response.body.find((x) => x.threadId === threadId && x.state === 'request-received')
        cy.request('POST', `${TEST_AGENT_URL}/proofs/${record.id}/accept-request`).then(() => {
          // eslint-disable-next-line cypress/no-unnecessary-waiting
          cy.wait(5000) // wait for the test agent request to be processed
          cy.get('[data-cy=section')
          cy.get('[data-cy="small-button"]').click()
        })
      })
    })

    cy.get('[data-cy=section')
    cy.get('[data-cy="small-button"]').click()

    cy.intercept('POST', '/credentials/offer-credential').as('offerCredential')

    cy.get('[data-cy=section')
    cy.get('[data-cy="small-button"]').click()

    cy.wait('@offerCredential').then((interception) => {
      const connectionId = interception.response?.body.connectionId
      const threadId = interception.response?.body.threadId

      cy.request('GET', `${TEST_AGENT_URL}/credentials/`).should((response) => {
        const testAgentRecord = response.body.find((x) => x.threadId === threadId && x.state === 'offer-received')

        cy.request('POST', `${TEST_AGENT_URL}/credentials/${testAgentRecord.id}/accept-offer`)

        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(5000) // wait for the test agent request to be processed
        cy.request('GET', `${API_URL}/demo/credentials/${connectionId}`).should((resp) => {
          const cred = resp.body.find((x) => x.threadId === threadId)
          cy.wrap(cred).its('state').should('equal', 'done')
        })

        cy.get('[data-cy=section')
        cy.get('[data-cy="small-button"]').click()
      })
    })

    cy.get('[data-cy=end-container]')
    cy.get('[data-cy=standard-button]').click()
    cy.url().should('be.equal', `${Cypress.config('baseUrl')}/dashboard`)
  })
})
