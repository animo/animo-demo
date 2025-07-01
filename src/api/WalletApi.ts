import { apiCall } from './BaseUrl'

export const getWallets = async () => {
  const response = await apiCall('/demo/wallets')
  return response.json()
}
