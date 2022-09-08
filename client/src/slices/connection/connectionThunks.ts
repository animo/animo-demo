import type { Entity } from '../../slices/types'

import { createAsyncThunk } from '@reduxjs/toolkit'

import * as Api from '../../api/ConnectionApi'

export const fetchConnectionById = createAsyncThunk('connection/fetchById', async (id: string) => {
  const response = await Api.getConnectionById(id)
  return response.data
})

export const fetchConnectionByOutOfBandId = createAsyncThunk('connection/fetchByOutOfBandId', async (id: string) => {
  const response = await Api.getConnectionByOutOfBandId(id)
  return response.data
})

export const createInvitation = createAsyncThunk('connection/createInvitation', async (entity?: Entity) => {
  const response = await Api.createInvitation(entity?.name, entity?.imageUrl)
  return response.data
})
