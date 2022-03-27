import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, closeNotification } from "../reducers/notificationReducer"

const AnecdotesList  = () => {

  const dispatch = useDispatch()

  const voteAnAnecdote = anecdote => {
    dispatch(voteAnecdote(anecdote.id))
    dispatch(setNotification({text: anecdote.content, type: 'VOTE'}))
    setTimeout(() => dispatch(closeNotification()), 5000)
  }

  const anecdotes = useSelector(state => state.anecdotes)

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteAnAnecdote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdotesList