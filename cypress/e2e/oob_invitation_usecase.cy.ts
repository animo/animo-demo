import type { Event } from '../types/event'

import {
  ConnectionEventTypes,
  CredentialEventTypes,
  CredentialState,
  DidExchangeState,
  ProofEventTypes,
  ProofState,
} from '@aries-framework/core'

import { isConnectionEvent, isCredentialEvent, isProofEvent } from '../config/event'
import { webSocketConfig } from '../config/websocket'

const API_URL = Cypress.env('apiUrl')

const TEST_AGENT_URL = 'http://localhost:9000'

describe('Onboarding demo test using legacy invitation', () => {
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
        streamTimeout: 20000,
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
      const threadId = interception.response?.body.threadId

      cy.request('GET', `${TEST_AGENT_URL}/credentials/`).should((response) => {
        const testAgentRecord = response.body.find(
          (credentialRecord) => credentialRecord.threadId === threadId && credentialRecord.state === 'offer-received'
        )

        cy.request('POST', `${TEST_AGENT_URL}/credentials/${testAgentRecord.id}/accept-offer`)

        cy.streamRequest<Event>(webSocketConfig, {
          streamTimeout: 20000,
          // Waits for credential event with threadId and state is done
          takeWhileFn: (event) => {
            if (!isCredentialEvent(event)) return true

            return (
              event.payload.credentialRecord.threadId !== threadId &&
              ![CredentialState.Done].includes(event.payload.credentialRecord.state)
            )
          },
        }).then((results) => {
          const length = (results && results.length) || 0
          const result = results && results[length - 1]

          expect(result).to.have.property('type', CredentialEventTypes.CredentialStateChanged)
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
        streamTimeout: 20000,
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
        cy.request('POST', `${TEST_AGENT_URL}/proofs/${record.id}/accept-request`)

        cy.streamRequest<Event>(webSocketConfig, {
          streamTimeout: 20000,
          // Waits for proof event with threadId and state is done
          takeWhileFn: (event) => {
            if (!isProofEvent(event)) return true

            return (
              event.payload.proofRecord.threadId !== threadId &&
              ![ProofState.Done].includes(event.payload.proofRecord.state)
            )
          },
        }).then((results) => {
          const length = (results && results.length) || 0
          const result = results && results[length - 1]

          expect(result).to.have.property('type', ProofEventTypes.ProofStateChanged)

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
      const threadId = interception.response?.body.threadId

      cy.request('GET', `${TEST_AGENT_URL}/credentials/`).should((response) => {
        const testAgentRecord = response.body.find((x) => x.threadId === threadId && x.state === 'offer-received')

        cy.request('POST', `${TEST_AGENT_URL}/credentials/${testAgentRecord.id}/accept-offer`)

        cy.streamRequest<Event>(webSocketConfig, {
          streamTimeout: 20000,
          // Waits for credential event with threadId and state is done
          takeWhileFn: (event) => {
            if (!isCredentialEvent(event)) return true

            return (
              event.payload.credentialRecord.threadId !== threadId &&
              ![CredentialState.Done].includes(event.payload.credentialRecord.state)
            )
          },
        }).then((results) => {
          const length = (results && results.length) || 0
          const result = results && results[length - 1]

          expect(result).to.have.property('type', CredentialEventTypes.CredentialStateChanged)

          cy.get('[data-cy=section')

          cy.get('[data-cy="small-button"]').click()
        })
      })
    })

    cy.get('[data-cy=end-container]')
    cy.get('[data-cy=standard-button]').click()
    cy.url().should('be.equal', `${Cypress.config('baseUrl')}/dashboard`)
  })
})
