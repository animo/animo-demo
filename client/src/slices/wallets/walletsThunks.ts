import { createAsyncThunk } from '@reduxjs/toolkit'

import * as Api from '../../api/WalletApi'

export const fetchWallets = createAsyncThunk('wallets/fetchAll', async () => {
  const response = await Api.getWallets()
  return response.data
})
