import { createSlice } from '@reduxjs/toolkit'

import { createInvitation, fetchConnectionById } from './connectionThunks'

export interface ConnectionState {
  id?: string
  state?: string
  invitationUrl?: string
  isLoading: boolean
}

const initialState: ConnectionState = {
  id: undefined,
  state: undefined,
  invitationUrl: undefined,
  isLoading: false,
}

const connectionSlice = createSlice({
  name: 'connection',
  initialState,
  reducers: {
    clearConnection: (state) => {
      state.id = undefined
      state.state = undefined
      state.invitationUrl = undefined
      state.isLoading = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createInvitation.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createInvitation.fulfilled, (state, action) => {
        state.isLoading = false
        state.id = action.payload.connection.id
        state.state = action.payload.connection.state
        state.invitationUrl = action.payload.invitationUrl
      })
      .addCase(fetchConnectionById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchConnectionById.fulfilled, (state, action) => {
        state.isLoading = false
        state.state = action.payload.state
      })
      .addCase('clearUseCase', (state) => {
        state.id = undefined
        state.state = undefined
        state.invitationUrl = undefined
        state.isLoading = false
      })
  },
})

export const { clearConnection } = connectionSlice.actions

export default connectionSlice.reducer
