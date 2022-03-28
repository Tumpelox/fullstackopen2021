import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  text: "",
  display: "none"
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      const content = action.payload
      state.text = content
      state.display = "block"
      
    },
    closeNotification(state, action) {
      state.text = ""
      state.display = "none"
    },
  }
})

export const { setNotification, closeNotification } = notificationSlice.actions

export const showNotification = (message, time) => {
  return dispatch => {
    dispatch(setNotification(message))
    clearTimeout()
    setTimeout(() => dispatch(closeNotification()), time * 1000)
  }
}

export default notificationSlice.reducer