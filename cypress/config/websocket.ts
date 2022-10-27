const WS_URL = Cypress.env('wsUrl')

import type { Event } from '../types/event'
import type { WebSocketSubjectConfig } from 'rxjs/webSocket'

// For full set of config values, check rxjs documentation
export const webSocketConfig: WebSocketSubjectConfig<Event> = {
  url: WS_URL,
}
