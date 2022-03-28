import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdotesSlice = createSlice({
  name: 'notification',
  initialState: [],
  reducers: {
    modifyAnecdote(state, action) {
      const content = action.payload
      state = state.map(anecdote => anecdote.id === content.id ? content : anecdote)
      state.sort( (first, second) => second.votes - first.votes )
      return state
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      state = action.payload
      state.sort( (first, second) => second.votes - first.votes )
      return state
    }
  }
})

export const { modifyAnecdote, appendAnecdote, setAnecdotes } = anecdotesSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(anecdote))
  }
}

export const voteAnecdote = content => {
  const data = { votes: content.votes + 1, content: content.content}
  return async dispatch => {
    const anecdote = await anecdoteService.modify(content.id, data)
    dispatch(modifyAnecdote(anecdote))
  }
}

export default anecdotesSlice.reducer