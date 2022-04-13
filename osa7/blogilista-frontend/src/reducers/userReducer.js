import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { showMessage } from './messageReducer'

const userSlice = createSlice({
  name: 'user',
  initialState: { user: null, all: null },
  reducers: {
    setUser(state, action) {
      const userdata = action.payload
      state.user = userdata
      return state
    },
    setUsers(state, action) {
      const userdata = action.payload
      state.all = userdata
      return state
    }
  }
})

export const { setUser, setUsers } = userSlice.actions

export const initializeUser = () => {
  return async dispatch => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      blogService.setToken(user.token)
      dispatch(setUser(user))
    }
  }
}

export const initializeUsers = () => {
  return async dispatch => {
    const users = await loginService.userData()
    dispatch(setUsers(users))
  }
}
export const logoutUser = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedUser')
    blogService.setToken(null)
    dispatch(setUser(null))
  }
}
export const loginUser = (username, password) => {
  return async dispatch => {
    const newUser = await loginService.login({
      username, password
    })
    window.localStorage.setItem('loggedUser', JSON.stringify(newUser))
    blogService.setToken(newUser.token)
    dispatch(setUser(newUser))
    dispatch(showMessage({ text: `Welcome back${newUser.name !== undefined ? ', ' + newUser.name : '' }`, type: 'confirm' }, 5))
  }
}

export default userSlice.reducer