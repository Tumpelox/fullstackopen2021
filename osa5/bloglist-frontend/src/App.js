import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import Create from './components/CreateNewBlog'
import Togglable from './components/Togglable'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState({})

  const blogForm = useRef()

  useEffect( () => {
    blogService.getAll()
      .then(response => setBlogs(response))
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      blogService.setToken(user.token)
      return setUser(user)
    }
  }, [])

  const logout = () => {
    setMessage({ text: `Logged out ${user.name !== undefined ? user.name : ''}`, type: 'confirm' })
    setTimeout(
      () => { setMessage({ text: null, type: null }) },
      5000
    )
    setUser(null)
    window.localStorage.removeItem('loggedUser')
  }

  const showBlogs = () => (
    <>
      <p>{user.name} logged in <button onClick={() => logout()}>Logout</button></p>
      <Togglable ref={blogForm}>
        <Create blogs={blogs} setBlogs={setBlogs} setMessage={setMessage} />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} setBlogs={setBlogs} blogs={blogs} setMessage={setMessage} />
      )}
    </>
  )

  const loginForm = () => (
    <Login user={user} setUser={setUser} setMessage={setMessage} />
  )

  return (
    <div>
      <Notification message={message} />
      <h2>blogs</h2>
      {user === null ?
        loginForm() :
        showBlogs()
      }
    </div>
  )
}

export default App