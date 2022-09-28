import type { CreateInvitationProps } from '../../slices/types'

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

export const createInvitation = createAsyncThunk(
  'connection/createInvitation',
  async (createInvitationOptions?: CreateInvitationProps) => {
    const entity = createInvitationOptions?.entity

    const response = createInvitationOptions?.useLegacyInvitations
      ? await Api.createLegacyInvitation(entity?.name, entity?.imageUrl)
      : await Api.createOobInvitation(entity?.name, entity?.imageUrl)

    return response.data
  }
)
