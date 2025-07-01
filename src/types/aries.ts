// Re-export Paradym types for backward compatibility
export type {
  DidcommConnection as ConnectionRecord,
  DidcommIssuance as CredentialExchangeRecord,
  DidcommVerification as ProofRecord,
} from '@/lib/paradym'

// Event types for webhooks (mapped to Paradym event types)
export interface CredentialEventTypes {
  CredentialStateChanged: 'didcomm.issuance.offered' | 'didcomm.issuance.completed' | 'didcomm.issuance.failed'
}

export interface ConnectionEventTypes {
  ConnectionStateChanged: 'didcomm.connection.created' | 'didcomm.connection.reused'
}

export interface ProofEventTypes {
  ProofStateChanged: 'didcomm.verification.requested' | 'didcomm.verification.verified' | 'didcomm.verification.failed'
}

// JSON Transformer placeholder (still needed for compatibility)
export class JsonTransformer {
  static toJSON(obj: any) {
    return JSON.stringify(obj)
  }
  
  static fromJSON(json: string, type: any) {
    return JSON.parse(json) as any
  }
}