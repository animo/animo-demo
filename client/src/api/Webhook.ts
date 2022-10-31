import type { ConnectionRecord, CredentialExchangeRecord, ProofRecord } from '@aries-framework/core'

import { useEffect } from 'react'

import { wsUrl } from './BaseUrl'

const webSocket = new WebSocket(wsUrl)

export type Event = {
  type: string
  payload: { proofRecord: ProofRecord; credentialRecord: CredentialExchangeRecord; connectionRecord: ConnectionRecord }
}

export function useWebhookEvent(
  eventType: string,
  callback: (event: Event) => void,
  isEnabled = true,
  dependencies: unknown[] = []
): void {
  useEffect(() => {
    const onEvent = (event: { data: string }) => {
      const parsedData: Event = JSON.parse(event.data)

      // We're only interested in eventType
      if (parsedData.type !== eventType) return

      callback(parsedData)
    }

    if (isEnabled) {
      webSocket.addEventListener('message', onEvent)
    }

    return () => {
      webSocket.removeEventListener('message', onEvent)
    }
  }, [isEnabled, eventType, ...dependencies])
}
