import type { Section } from '../types'
import type { PayloadAction } from '@reduxjs/toolkit'

import { createSlice } from '@reduxjs/toolkit'

export interface SectionState {
  section?: Section
}

const initialState: SectionState = {
  section: undefined,
}

const sectionSlice = createSlice({
  name: 'section',
  initialState,
  reducers: {
    setSection: (state, action: PayloadAction<Section>) => {
      state.section = action.payload
    },
    clearSection: (state) => {
      state.section = undefined
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase('clearUseCase', (state) => {
        state.section = undefined
      })
      .addCase('demo/resetDemo', () => {
        return initialState
      })
  },
})

export const { setSection, clearSection } = sectionSlice.actions

export default sectionSlice.reducer
