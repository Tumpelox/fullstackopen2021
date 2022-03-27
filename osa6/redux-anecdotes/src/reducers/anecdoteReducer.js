import { createSlice } from '@reduxjs/toolkit'

const anecdotesSlice = createSlice({
  name: 'notification',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const content = action.payload
      state = state.map(anecdote => anecdote.id === content ? anecdote.votes += 1 : anecdote)
      state.sort( (first, second) => second.votes - first.votes )
    },
    createAnecdote(state, action) {
      const content = action.payload
      //state.push(asObject(content))
    },
  }
})

export const { voteAnecdote, createAnecdote } = anecdotesSlice.actions
export default anecdotesSlice.reducer