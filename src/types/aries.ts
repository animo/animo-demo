// Temporary types to replace Aries Framework types until we migrate to Paradym
export interface ConnectionRecord {
  id: string
  state: string
  theirLabel?: string
  createdAt: Date
  updatedAt: Date
}

export interface CredentialExchangeRecord {
  id: string
  state: string
  connectionId: string
  createdAt: Date
  updatedAt: Date
}

export interface ProofRecord {
  id: string
  state: string
  connectionId?: string
  createdAt: Date
  updatedAt: Date
}

// Event types for webhooks
export interface CredentialEventTypes {
  CredentialStateChanged: string
}

export interface ConnectionEventTypes {
  ConnectionStateChanged: string
}

export interface ProofEventTypes {
  ProofStateChanged: string
}

// JSON Transformer placeholder
export class JsonTransformer {
  static toJSON(obj: any) {
    return JSON.stringify(obj)
  }
  
  static fromJSON(json: string, type: any) {
    return JSON.parse(json) as any
  }
}