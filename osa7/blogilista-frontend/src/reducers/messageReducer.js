import { createSlice } from '@reduxjs/toolkit'

const messageSlice = createSlice({
  name: 'message',
  initialState: {},
  reducers: {
    setMessage(state, action) {
      const message = action.payload
      state = message
      return state
    },
    closeMessage(state, action) { // eslint-disable-line
      state = { text:'', type:'' }
      return state
    }
  }
})

export const { setMessage, closeMessage } = messageSlice.actions

export const showMessage = (message, time) => {
  return dispatch => {
    dispatch(setMessage(message))
    clearTimeout()
    setTimeout(() => dispatch(closeMessage()), time*1000)
  }
}
export default messageSlice.reducer