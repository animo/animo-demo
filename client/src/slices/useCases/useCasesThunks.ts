import { createAsyncThunk } from '@reduxjs/toolkit'

import * as Api from '../../api/UseCaseApi'

export const fetchAllUseCasesByCharId = createAsyncThunk('useCases/fetchAllByCharId', async (characterId: string) => {
  const response = await Api.getUseCasesByCharId(characterId)
  return response.data
})

export const fetchUseCaseBySlug = createAsyncThunk('useCases/fetchBySlug', async (slug: string) => {
  const response = await Api.getUseCaseBySlug(slug)
  return response.data
})
