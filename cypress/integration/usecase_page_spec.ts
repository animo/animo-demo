const API_URL = Cypress.env('apiUrl')

describe('UseCase Page', () => {
  it('successfully completes school use case', () => {
    cy.visit('/demo')
    cy.get('[data-cy=next-onboarding-step]').click()
    cy.get('[data-cy=use-wallet]').first().click()
    cy.get('[data-cy=small-button]').click()

    cy.get('[data-cy=select-char]').first().click()
    cy.intercept('POST', `${API_URL}/connections/create-invitation`).as('createInvitation')
    cy.get('[data-cy=next-onboarding-step]').click()

    cy.wait('@createInvitation').then((interception) => {
      const body = { invitation: interception.response?.body.invitation, autoAcceptConnection: true }
      const id = interception.response?.body.connection.id

      cy.intercept('GET', `${API_URL}/connections/${id}`).as('getConnection')
      cy.request('POST', `${API_URL}/connections/receive-invitation`, body)
      cy.wait(['@getConnection']).its('response.body._tags.state').should('not.equal', 'invited')
    })

    cy.intercept('POST', '/credentials/offer-credential').as('offerCredential')

    cy.get('[data-cy=next-onboarding-step]').click()

    cy.wait('@offerCredential').then((interception) => {
      const threadId = interception.response?.body.threadId

      cy.request('GET', `${API_URL}/credentials/`).should((response) => {
        const record = response.body.find((x) => x.threadId === threadId && x.state === 'offer-received')
        cy.request('POST', `${API_URL}/credentials/${record.id}/accept-offer`).then(() => {
          cy.get('[data-cy=next-onboarding-step]').click()
        })
      })
    })

    cy.get('[data-cy=next-onboarding-step]').click()
    cy.url().should('be.equal', `${Cypress.config('baseUrl')}/dashboard`)

    cy.get('[data-cy=select-use-case]').first().click()

    cy.intercept('POST', `${API_URL}/connections/create-invitation`).as('createInvitation')
    cy.get('[data-cy=start-container]')
    cy.get('[data-cy=small-button]').click()

    cy.wait('@createInvitation').then((interception) => {
      const body = { invitation: interception.response?.body.invitation, autoAcceptConnection: true }
      const id = interception.response?.body.connection.id
      cy.intercept('GET', `${API_URL}/connections/${id}`).as('getConnection')
      cy.request('POST', `${API_URL}/connections/receive-invitation`, body)
      cy.wait(['@getConnection']).its('response.body._tags.state').should('not.equal', 'invited')
    })

    cy.intercept('POST', `${API_URL}/proofs/request-proof`).as('createProof')

    cy.get('[data-cy=section')
    cy.get('[data-cy="small-button"]').click()

    cy.wait('@createProof').then((interception) => {
      const threadId = interception.response?.body.threadId
      cy.request('GET', `${API_URL}/proofs/`).should((response) => {
        const record = response.body.find((x) => x.threadId === threadId && x.state === 'request-received')
        cy.request('POST', `${API_URL}/proofs/${record.id}/accept-request`).then(() => {
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
      cy.request('GET', `${API_URL}/credentials/`).should((response) => {
        const record = response.body.find((x) => x.threadId === threadId && x.state === 'offer-received')
        cy.request('POST', `${API_URL}/credentials/${record.id}/accept-offer`).then(() => {
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
