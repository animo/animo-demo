import WebSocket from 'ws'

import { useAppDispatch } from '../hooks/hooks'

import { wsUrl } from './BaseUrl'

export const listenForEvents = async (): Promise<void> => {
  const client = new WebSocket(wsUrl)

  const dispatch = useAppDispatch()

  const waitForEventPromise = new Promise(() => {
    client.on('message', (data) => {
      const event = JSON.parse(data as string)
      dispatch({ type: 'demo/event', action: event })
    })
  })

  await waitForEventPromise
}
