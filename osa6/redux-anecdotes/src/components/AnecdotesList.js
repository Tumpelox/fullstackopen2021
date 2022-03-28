import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from "../reducers/notificationReducer"

const AnecdotesList  = () => {

  const dispatch = useDispatch()

  const voteAnAnecdote = anecdote => {
    dispatch(voteAnecdote(anecdote))
    dispatch(showNotification(`You voted '${anecdote.content}'`, 5))
  }

  var anecdotes = useSelector(state => state.anecdotes)
  var filter = useSelector(state => state.filter)
  
  anecdotes  = anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.filter.toLowerCase()))

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