import { useEffect } from 'react'

import { wsUrl } from './BaseUrl'

const webSocket = new WebSocket(wsUrl)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Event = { type: string; payload: any }

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
