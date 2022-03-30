import { useState } from 'react'
import { useField } from './hooks'
import { BrowserRouter as Router,
  Routes, Route, Link, useParams, useNavigate } from 'react-router-dom'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link to='/' style={padding}>anecdotes</Link>
      <Link to='/create' style={padding}>create new</Link>
      <Link to='/about' style={padding}>about</Link>
    </div>
  )
}

const Notification = ({ notification }) => {
  var style={
    display: 'none',
    border: '1px solid',
    padding: '10px'
  }
  if (notification.active) {
    style.display = 'block'
  } else {
    style.display = 'none'
  }

  return (
    <div style={style}>
      {notification.message}
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <li key={anecdote.id} ><a href={'/anecdote/' + anecdote.id}>{anecdote.content}</a></li>)}
    </ul>
  </div>
)

const Anecdote = ({anecdotes}) => {
  const id = useParams().id
  const anecdote = anecdotes.find(a => a.id.toString() === id)

  return (
    <div>
      <p>{anecdote.content}, by {anecdote.author}</p>
      <p>{anecdote.votes} votes</p>
      <p>for more info: <a href={anecdote.info}>{anecdote.info}</a></p>
    </div>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = ({ setNotification, addNew }) => {
  const [ authorReset, author ]= useField('text')
  const [ infoReset, info ]= useField('text')
  const [ contentReset, content ]= useField('text')
  const navigate = useNavigate()

  const resetForm = () => {
    authorReset('')
    infoReset('')
    contentReset('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    navigate("/")
    setNotification({message:'You created ' + content.value + ' by ' + author, active: true})
    setTimeout(() => setNotification({message:'', active: false}), 5000)
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button type='submit'>create</button><button type='button' onClick={resetForm}>reset</button>
      </form>
    </div>
  )

}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState({message:"", active:false})

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <Router >
      <h1>Software anecdotes</h1>
      <Notification notification={notification} />
      <Menu />
      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/about" element={<About />} />
        <Route path="/create" element={<CreateNew setNotification={setNotification} addNew={addNew} />} />
        <Route path="/anecdote/:id" element={<Anecdote anecdotes={anecdotes} />}/>
      </Routes>
      <Footer />
    </Router >
  )
}

export default App
