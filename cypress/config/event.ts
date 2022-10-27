import type { Event } from '../types/event'
import type { ConnectionStateChangedEvent } from '@aries-framework/core'

import { ConnectionEventTypes } from '@aries-framework/core'

export function isConnectionEvent(event: Event): event is ConnectionStateChangedEvent {
  return event.type === ConnectionEventTypes.ConnectionStateChanged
}
