import { configureStore } from '@reduxjs/toolkit'

import blogsReducer, { setBlogs } from './reducers/blogsReducer'
import messageReducer from './reducers/messageReducer'
import userReducer from './reducers/userReducer'

import blogService from './services/blogs'

const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    message: messageReducer,
    users: userReducer
  }
})

blogService.getAll().then( blogs => store.dispatch(setBlogs(blogs)))

export default store

