import axios from 'axios'

const baseUrl = process.env.NEXT_PUBLIC_HOST_BACKEND || 'http://localhost:3000/api'

export const wsUrl: string | URL = process.env.NEXT_PUBLIC_HOST_WEBSOCKET || 'ws://localhost:3000'

export const apiCall = axios.create({ baseURL: baseUrl })
