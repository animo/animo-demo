import type { AxiosResponse } from 'axios'

import { apiCall } from './BaseUrl'

export const getCharacters = (): Promise<AxiosResponse> => {
  return apiCall.get('/demo/characters')
}

export const getCharacterById = (characterId: string): Promise<AxiosResponse> => {
  return apiCall.get(`/demo/characters/${characterId}`)
}
