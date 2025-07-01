import type { Character } from '../types'
import type { PayloadAction } from '@reduxjs/toolkit'

import { createSlice } from '@reduxjs/toolkit'

import { fetchAllCharacters, fetchCharacterById } from './charactersThunks'

interface CharactersState {
  characters: Character[]
  currentCharacter?: Character
  isLoading: boolean
}

const initialState: CharactersState = {
  characters: [],
  currentCharacter: undefined,
  isLoading: false,
}

const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    setCharacter: (state, action: PayloadAction<Character>) => {
      state.currentCharacter = action.payload
    },
    removeCharacter: (state) => {
      state.currentCharacter = undefined
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCharacters.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchAllCharacters.fulfilled, (state, action) => {
        state.isLoading = false
        state.characters = action.payload
      })
      .addCase(fetchCharacterById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchCharacterById.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentCharacter = action.payload
      })
      .addCase('demo/resetDemo', () => {
        return initialState
      })
  },
})

export const { setCharacter, removeCharacter } = characterSlice.actions

export default characterSlice.reducer
