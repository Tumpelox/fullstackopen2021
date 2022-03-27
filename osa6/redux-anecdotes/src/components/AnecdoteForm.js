import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, closeNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    dispatch(setNotification({text: content, type: 'CREATE_ANECDOTE'}))
    setTimeout(() => dispatch(closeNotification()), 5000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button type='submit' >create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm