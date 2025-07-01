const baseUrl = process.env.NEXT_PUBLIC_HOST_BACKEND || 'http://localhost:3000/api'

export const wsUrl: string | URL = process.env.NEXT_PUBLIC_HOST_WEBSOCKET || 'ws://localhost:3000'

export async function apiCall(endpoint: string, options: RequestInit = {}): Promise<Response> {
  const url = `${baseUrl}${endpoint}`
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  }

  const response = await fetch(url, config)
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  
  return response
}
