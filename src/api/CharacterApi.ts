import { apiCall } from './BaseUrl'

export const getCharacters = async () => {
  const response = await apiCall('/demo/characters')
  return response.json()
}

export const getCharacterById = async (characterId: string) => {
  const response = await apiCall(`/demo/characters/${characterId}`)
  return response.json()
}
