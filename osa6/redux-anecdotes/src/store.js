import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'

const store = configureStore({
  reducer: { 
    anecdotes: anecdoteReducer,
    notification: notificationReducer
  }
})

store.subscribe(() => console.log(store.getState()))

export default store