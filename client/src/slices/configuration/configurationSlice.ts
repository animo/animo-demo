import { createSlice } from '@reduxjs/toolkit'

interface ConfigurationState {
  useLegacyInvitation: boolean
}

const initialState: ConfigurationState = {
  useLegacyInvitation: true,
}

const configurationSlice = createSlice({
  name: 'configuration',
  initialState,
  reducers: {
    setUseLegacyInvitation: (state, action) => {
      state.useLegacyInvitation = action.payload
    },
  },
})

export const { setUseLegacyInvitation } = configurationSlice.actions

export default configurationSlice.reducer
