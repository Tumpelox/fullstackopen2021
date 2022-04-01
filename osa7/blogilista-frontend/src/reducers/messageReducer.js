import { createSlice } from '@reduxjs/toolkit'

const messageSlice = createSlice({
  name: 'message',
  initialState: {},
  reducers: {
    setMessage(state, action) {
      const message = action.payload
      state = message
    },
    closeMessage(state, action) { // eslint-disable-line 
    }
  }
})

export const { setMessage, closeMessage } = messageSlice.actions
export default messageSlice.reducer