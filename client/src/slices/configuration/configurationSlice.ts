import { createSlice } from '@reduxjs/toolkit'

interface ConfigurationState {
  invitationMethod: boolean
}

const initialState: ConfigurationState = {
  invitationMethod: false,
}

const configurationSlice = createSlice({
  name: 'configuration',
  initialState,
  reducers: {
    setinvitationMethod: (state, action) => {
      state.invitationMethod = action.payload === 'oob' ? true : false
    },
  },
})

export const { setinvitationMethod } = configurationSlice.actions

export default configurationSlice.reducer
