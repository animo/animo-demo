const WS_URL = Cypress.env('wsUrl')

import type { Event } from '../types/event'
import type { WebSocketSubjectConfig } from 'rxjs/webSocket'

export const webSocketConfig: WebSocketSubjectConfig<Event> = {
  url: WS_URL,
}
