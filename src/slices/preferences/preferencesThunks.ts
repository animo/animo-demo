import { createAsyncThunk } from '@reduxjs/toolkit'

import * as Api from '../../api/UtilApi'

export const fetchLastServerReset = createAsyncThunk('preferences/fetchServerReset', async () => {
  const response = await Api.getLastServerReset()
  return response.data
})
