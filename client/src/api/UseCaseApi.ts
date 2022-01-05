import type { AxiosResponse } from 'axios'

import { apiCall } from './BaseUrl'

export const getUseCasesByCharId = (characterId: string): Promise<AxiosResponse> => {
  return apiCall.get(`/demo/usecases/character/${characterId}`, {})
}

export const getUseCaseBySlug = (slug: string): Promise<AxiosResponse> => {
  return apiCall.get(`/demo/usecases/${slug}`)
}
