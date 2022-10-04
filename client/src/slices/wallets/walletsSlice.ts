import type { Wallet } from '../types'

import { createSlice } from '@reduxjs/toolkit'

import { fetchWallets } from './walletsThunks'

interface WalletsState {
  wallets: Wallet[]
  isLoading: boolean
}

const initialState: WalletsState = {
  wallets: [],
  isLoading: false,
}

const characterSlice = createSlice({
  name: 'wallets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWallets.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchWallets.fulfilled, (state, action) => {
        state.isLoading = false
        state.wallets = action.payload
      })
      .addCase('demo/resetState', () => {
        return initialState
      })
  },
})

export default characterSlice.reducer
