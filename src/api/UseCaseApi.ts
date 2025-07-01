import { apiCall } from './BaseUrl'

export const getUseCasesByCharId = async (characterId: string) => {
  const response = await apiCall(`/demo/usecases/character/${characterId}`)
  return response.json()
}

export const getUseCaseBySlug = async (slug: string) => {
  const response = await apiCall(`/demo/usecases/${slug}`)
  return response.json()
}
