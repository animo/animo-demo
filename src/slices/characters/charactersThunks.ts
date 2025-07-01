import { createAsyncThunk } from '@reduxjs/toolkit'

import * as Api from '../../api/CharacterApi'

export const fetchAllCharacters = createAsyncThunk('characters/fetchAll', async () => {
  const response = await Api.getCharacters()
  return response.data
})

export const fetchCharacterById = createAsyncThunk('characters/fetchById', async (id: string) => {
  const response = await Api.getCharacterById(id)
  return response.data
})
