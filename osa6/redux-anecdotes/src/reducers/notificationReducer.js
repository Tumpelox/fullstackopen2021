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
      state.text = content.type === 'VOTE' ? 'You voted ' + content.text : 'You created ' + content.text
      state.display = "block"
      
    },
    closeNotification(state, action) {
      state.text = ""
      state.display = "none"
    },
  }
})

export const { setNotification, closeNotification } = notificationSlice.actions
export default notificationSlice.reducer