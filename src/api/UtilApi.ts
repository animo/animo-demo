import { apiCall } from './BaseUrl'

export const getLastServerReset = async () => {
  const response = await apiCall('/server/last-reset')
  return response.json()
}
