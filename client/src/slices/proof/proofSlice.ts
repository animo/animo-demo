import type { ProofRecord } from '@aries-framework/core'

import { createSlice } from '@reduxjs/toolkit'

import { createProof, createProofOOB, fetchProofById } from './proofThunks'

interface ProofState {
  proof?: ProofRecord
  proofUrl?: string
  isLoading: boolean
}

const initialState: ProofState = {
  proof: undefined,
  proofUrl: undefined,
  isLoading: false,
}

const proofSlice = createSlice({
  name: 'proof',
  initialState,
  reducers: {
    clearProof: (state) => {
      state.proof = undefined
      state.isLoading = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProof.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createProof.fulfilled, (state, action) => {
        state.isLoading = false
        state.proof = action.payload
      })
      .addCase(createProofOOB.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createProofOOB.fulfilled, (state, action) => {
        state.isLoading = false
        // const url = action.payload.message.split('?')[0] + '?id=' + action.payload.proofRecord.id
        state.proofUrl = action.payload.message
        state.proof = action.payload.proofRecord
      })
      .addCase(fetchProofById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchProofById.fulfilled, (state, action) => {
        state.isLoading = false
        state.proof = action.payload
      })
      .addCase('clearUseCase', (state) => {
        state.proof = undefined
        state.isLoading = false
      })
  },
})

export const { clearProof } = proofSlice.actions

export default proofSlice.reducer
