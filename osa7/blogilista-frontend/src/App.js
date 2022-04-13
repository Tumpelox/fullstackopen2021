import React, { useEffect } from 'react'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import Form from './components/Form'
import Users from './components/Users'
import User from './components/User'
import Notification from './components/Notification'
import { useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer'
import { initializeUser, initializeUsers } from './reducers/userReducer'
import { BrowserRouter as Router,
  Routes, Route, Link } from 'react-router-dom'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link to='/' style={padding}>blogs</Link>
      <Link to='/users' style={padding}>users</Link>
    </div>
  )
}

const App = () => {
  const dispatch = useDispatch()

  useEffect( () => dispatch(initializeBlogs()), [dispatch])
  useEffect( () => dispatch(initializeUsers()), [dispatch])
  useEffect( () => dispatch(initializeUser()), [dispatch])

  return (
    <Router>
      <Notification />
      <Menu />
      <h2>blogs</h2>
      <Routes>
        <Route path='/' element={
          <>
            <Form />
            <Blogs />
          </>
        }/>
        <Route path='/users' element={
          <>
            <Form />
            <Users />
          </>
        }/>
        <Route path='/users/:id' element={
          <>
            <Form />
            <User />
          </>
        }/>
        <Route path='/blogs/:id' element={
          <>
            <Form />
            <Blog />
          </>
        }/>
      </Routes>
    </Router>
  )
}

export default App