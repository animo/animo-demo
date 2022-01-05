import type { CredentialData } from '../types'

import { createAsyncThunk } from '@reduxjs/toolkit'

import * as Api from '../../api/CredentialApi'

export const fetchCredentialsByConId = createAsyncThunk('credentials/fetchAllByConId', async (connectionId: string) => {
  const response = await Api.getDemoCredentialsByConnectionId(connectionId)
  return response.data
})

export const issueCredential = createAsyncThunk(
  'credentials/issueCredential',
  async (data: { connectionId: string; cred: CredentialData }) => {
    const response = await Api.issueCredential(data.connectionId, data.cred)
    return response.data
  }
)

export const fetchCredentialById = createAsyncThunk('credentials/fetchById', async (id: string) => {
  const response = await Api.getCredentialById(id)
  return response.data
})

export const deleteCredentialById = createAsyncThunk('credentials/deleteById', async (id: string) => {
  await Api.deleteCredentialById(id)
  return id
})
