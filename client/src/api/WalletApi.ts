import type { AxiosResponse } from 'axios'

import { apiCall } from './BaseUrl'

export const getWallets = (): Promise<AxiosResponse> => {
  return apiCall.get('/demo/wallets')
}
