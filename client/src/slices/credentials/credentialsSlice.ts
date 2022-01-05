import type { CredentialRecord } from '@aries-framework/core'

import { createSlice } from '@reduxjs/toolkit'

import {
  fetchCredentialsByConId,
  fetchCredentialById,
  issueCredential,
  deleteCredentialById,
} from './credentialsThunks'

interface CredentialState {
  credentials: CredentialRecord[]
  issuedCredentials: CredentialRecord[]
  isLoading: boolean
}

const initialState: CredentialState = {
  credentials: [],
  issuedCredentials: [],
  isLoading: true,
}
const credentialSlice = createSlice({
  name: 'credentials',
  initialState,
  reducers: {
    clearCredentials: (state) => {
      state.credentials.map(
        (x) => (x.state === 'credential-issued' || x.state === 'done') && state.issuedCredentials.push(x)
      )
      state.credentials = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCredentialsByConId.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchCredentialsByConId.fulfilled, (state, action) => {
        state.isLoading = false
        state.credentials = action.payload
      })
      .addCase(issueCredential.pending, (state) => {
        state.isLoading = true
      })
      .addCase(issueCredential.fulfilled, (state, action) => {
        state.isLoading = false
        state.credentials.push(action.payload)
      })
      .addCase(fetchCredentialById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchCredentialById.fulfilled, (state, action) => {
        state.isLoading = false
        const index = state.credentials.findIndex((cred) => cred.id == action.payload.id)

        if (index == -1) {
          // creds doesn't exist, add it
          state.credentials.push(action.payload)
          return state
        }

        // cred does exist, update it
        state.credentials[index] = action.payload
        return state
      })
      .addCase(deleteCredentialById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteCredentialById.fulfilled, (state, action) => {
        state.isLoading = false
        state.credentials.filter((cred) => cred.id !== action.payload)
        return state
      })
      .addCase('clearUseCase', (state) => {
        state.credentials.map(
          (x) => (x.state === 'credential-issued' || x.state === 'done') && state.issuedCredentials.push(x)
        )
        state.credentials = []
        state.isLoading = false
      })
  },
})

export const { clearCredentials } = credentialSlice.actions

export default credentialSlice.reducer
