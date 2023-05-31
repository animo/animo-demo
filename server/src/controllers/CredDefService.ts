import type { CredDef, Schema } from 'indy-sdk'

import { Agent, IndySdkError } from '@aries-framework/core'
import { isIndyError } from '@aries-framework/core/build/utils/indyError'
import { Inject, Service } from 'typedi'

@Service()
export class CredDefService {
  @Inject()
  private agent: Agent
  private credentialDefinitions: CredDef[] = []

  public constructor(agent: Agent) {
    this.agent = agent
    this.init()
  }

  public getCredentialDefinitionIdByTag(tag: string) {
    const def = this.credentialDefinitions.find((x) => x.tag === tag)

    if (!def) {
      throw new Error(`CredentialDefinition not found for ${tag}`)
    }

    return def.id
  }

  // FIXME: this will break if called concurrently. We need to do this in setup, and agent can't be used until it is done.
  public async getAll() {
    if (this.credentialDefinitions.length === 0) {
      await this.init()
    }
    return this.credentialDefinitions
  }

  public async getAllCredentialsByConnectionId(connectionId: string) {
    const credentials = await this.agent.credentials.getAll()
    const filtered = credentials.filter((cred) => cred.connectionId === connectionId)

    return filtered.map((c) => c.toJSON())
  }

  // TODO: these should be auto-created based on the use cases.
  private async init() {
    const cd1 = await this.createSchemaCredentialDefinition({
      schema: {
        attributeNames: ['Name', 'Street', 'City', 'Date of birth', 'Nationality'],
        name: 'CRA ID',
        version: '1.1',
      },
      credentialDefinition: {
        supportRevocation: false,
        tag: 'CRA ID Card',
      },
    })

    const cd2 = this.createSchemaCredentialDefinition({
      schema: {
        name: 'Credit card',
        version: '1.0.0',
        attributeNames: ['Security code', 'Card number', 'Issuer', 'Holder', 'Valid until'],
      },
      credentialDefinition: {
        supportRevocation: false,
        tag: 'Credit card',
      },
    })

    const cd3 = this.createSchemaCredentialDefinition({
      schema: {
        name: 'Airplane Ticket',
        version: '1.0',
        attributeNames: ['Airline', 'Class', 'Seat', 'Passenger'],
      },
      credentialDefinition: {
        supportRevocation: false,
        tag: 'Airplane Ticket',
      },
    })

    const cd4 = this.createSchemaCredentialDefinition({
      schema: {
        name: 'Conference Pass',
        version: '1.0.0',
        attributeNames: ['Name', 'Nationality'],
      },
      credentialDefinition: {
        supportRevocation: false,
        tag: 'Conference Pass',
      },
    })

    const cd5 = this.createSchemaCredentialDefinition({
      schema: {
        name: 'Hotel Keycard',
        version: '1.0.0',
        attributeNames: ['name', 'room'],
      },
      credentialDefinition: {
        supportRevocation: false,
        tag: 'Hotel Keycard',
      },
    })

    const cd6 = this.createSchemaCredentialDefinition({
      schema: {
        name: 'University Card',
        version: '1.0.2',
        attributeNames: ['Date of birth', 'StudentID', 'Valid until', 'University', 'Faculty', 'Name'],
      },
      credentialDefinition: {
        supportRevocation: false,
        tag: 'University Card',
      },
    })

    const cdNoa = this.createSchemaCredentialDefinition({
      schema: {
        name: "Notice of Assessment",
        version: '1.0.0',
        attributeNames: ['Corporation', 'Faculty', 'Sin', 'Date Issued', 'Net Income','Name','Date of birth'],
      },
      credentialDefinition: {
        supportRevocation: false,
        tag: `NOA Card`,
      },
    })

    const cdLoan = this.createSchemaCredentialDefinition({
      schema: {
        name: "Morgage Loan",
        version: '1.0.2',
        attributeNames: ['Name','Date of birth','Sin','Net Income','Corporation','Approved Loan Amount'],
      },
      credentialDefinition: {
        supportRevocation: false,
        tag: `Morgage Loan`,
      },
    })

    const cd7 = this.createSchemaCredentialDefinition({
      schema: {
        name: "Master's Degree",
        version: '1.0.0',
        attributeNames: ['Graduate', 'Date', 'Field', 'Institute'],
      },
      credentialDefinition: {
        supportRevocation: false,
        tag: `Master's Degree`,
      },
    })

    const cd8 = this.createSchemaCredentialDefinition({
      schema: {
        name: 'Proof of Employment',
        version: '1.0.0',
        attributeNames: ['Date', 'Organization', 'Title', 'Name'],
      },
      credentialDefinition: {
        supportRevocation: false,
        tag: `Proof of Employment`,
      },
    })

    const cd9 = this.createSchemaCredentialDefinition({
      schema: {
        name: 'Rent Agreement',
        version: '1.0.1',
        attributeNames: ['Landlord', 'Name', 'Rent', 'Start date', 'End date'],
      },
      credentialDefinition: {
        supportRevocation: false,
        tag: `Rent Agreement`,
      },
    })

    const cd10 = this.createSchemaCredentialDefinition({
      schema: {
        name: 'Laptop Invoice',
        version: '1.0.1',
        attributeNames: ['Street', 'Store', 'Name', 'City', 'Product', 'Price', 'Date'],
      },
      credentialDefinition: {
        supportRevocation: false,
        tag: `Laptop Invoice`,
      },
    })

    const cd11 = this.createSchemaCredentialDefinition({
      schema: {
        name: 'Crypto Wallet',
        version: '1.0.2',
        attributeNames: ['Address', 'Balance'],
      },
      credentialDefinition: {
        supportRevocation: false,
        tag: `Crypto Wallet`,
      },
    })

    const cd12 = this.createSchemaCredentialDefinition({
      schema: {
        name: 'Gym Membership',
        version: '1.0',
        attributeNames: ['Name', 'Valid until', 'Date of birth'],
      },
      credentialDefinition: {
        supportRevocation: false,
        tag: `Gym Membership`,
      },
    })

    this.credentialDefinitions = await Promise.all([cd1, cd2, cd3, cd4, cd5, cd6, cd7, cd8, cd9, cd10, cd11, cd12,cdNoa, cdLoan])
  }

  private async createSchemaCredentialDefinition(options: {
    schema: {
      attributeNames: string[]
      name: string
      version: string
    }
    credentialDefinition: {
      tag: string
      supportRevocation: boolean
    }
  }) {
    const publicDid = this.agent.publicDid?.did
    if (!publicDid) {
      throw new Error('Public DID not found')
    }

    const schemaId = `${publicDid}:2:${options.schema.name}:${options.schema.version}`

    let schema: Schema

    try {
      schema = await this.agent.ledger.getSchema(schemaId)
      this.agent.config.logger.info(`Schema ${schema.id} already exists`)
    } catch (error) {
      if (error instanceof IndySdkError && isIndyError(error.cause, 'LedgerNotFound')) {
        this.agent.config.logger.info(`Schema ${schemaId} does not exist yet, creating it...`)
        schema = await this.agent.ledger.registerSchema({
          attributes: options.schema.attributeNames,
          name: options.schema.name,
          version: options.schema.version,
        })
      } else {
        this.agent.config.logger.info(`Error fetching ${schemaId}`)
        throw error
      }
    }

    return await this.agent.ledger.registerCredentialDefinition({
      schema,
      supportRevocation: options.credentialDefinition.supportRevocation,
      tag: options.credentialDefinition.tag,
    })
  }
}
