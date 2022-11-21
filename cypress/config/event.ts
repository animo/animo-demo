import type { Event } from '../types/event'
import type {
  ConnectionStateChangedEvent,
  CredentialStateChangedEvent,
  ProofStateChangedEvent,
} from '@aries-framework/core'

import { ProofEventTypes, CredentialEventTypes, ConnectionEventTypes } from '@aries-framework/core'

export function isConnectionEvent(event: Event): event is ConnectionStateChangedEvent {
  return event.type === ConnectionEventTypes.ConnectionStateChanged
}

export function isCredentialEvent(event: Event): event is CredentialStateChangedEvent {
  return (
    event.type === CredentialEventTypes.CredentialStateChanged ||
    event.type === CredentialEventTypes.RevocationNotificationReceived
  )
}

export function isProofEvent(event: Event): event is ProofStateChangedEvent {
  return event.type === ProofEventTypes.ProofStateChanged
}
