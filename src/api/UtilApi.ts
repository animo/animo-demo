import type { AxiosResponse } from 'axios'

import { apiCall } from './BaseUrl'

export const getLastServerReset = (): Promise<AxiosResponse> => {
  return apiCall.get('/server/last-reset')
}
