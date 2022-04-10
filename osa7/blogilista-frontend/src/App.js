import React, { useState, useEffect, useRef } from 'react'
import Blog from './utilities/Blog'
import blogService from './services/blogs'
import Login from './utilities/Login'
import Create from './utilities/CreateNewBlog'
import Togglable from './utilities/Togglable'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer'

const App = () => {
  const dispatch = useDispatch()

  const blogForm = useRef()

  useEffect( () => dispatch(initializeBlogs()), [dispatch])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      blogService.setToken(user.token)
      return setUser(user)
    }
  }, [])

  const logout = () => {
    setMessage({ text: `Logged out ${user.name !== undefined ? user.name : ''}`, type: 'confirm' }, 5)
    setUser(null)
    window.localStorage.removeItem('loggedUser')
  }

  const deleteBlog = async blog => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {

        setMessage({ text: `Deleted ${blog.title} by ${blog.author} `, type: 'confirm' }, 5)
      } catch(exception) {
        setMessage({ text: 'Blog delete failed', type: 'error' }, 5)
      }
    }
  }

  const updateBlog = async blog => {
    try {
      voteBlog(blogs.filter(b => b.id !== blog.id ? b : b.likes += 1 ))
      setMessage({ text: `Updated ${blog.title} by ${blog.author} `, type: 'confirm' }, 5)
    } catch(exception) {
      setMessage({ text: 'Blog update failed', type: 'error' }, 5)
    }
  }

  const createBlog = async blog => {
    try {
      blogForm.current.toggleVisibility()
      createBlog(blog)
      setMessage({ text: `Added ${blog.title} by ${blog.author}`, type: 'confirm' }, 5)
    } catch (exception) {
      setMessage({ text: 'Failed to add new blog', type: 'error' }, 5)
    }
  }

  const showBlogs = () => {
    var user = useSelector(state => state.user)
    return (
      <>
        <p>{user.name} logged in <button onClick={() => logout()}>Logout</button></p>
        <Togglable buttonLabel='Create new' ref={blogForm}>
          <Create />
        </Togglable>
      </>
    )
  }

  const loginForm = () => (
    <Togglable buttonLabel='Login' ref={blogForm}>
      <Login />
    </Togglable>
  )

  return (
    <div>
      <Notification />
      <h2>blogs</h2>
      {user === null ?
        loginForm() :
        showBlogs()
      }
      <Blogs />
    </div>
  )
}

export default App