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
      .then(response => {
        var sorted = response.sort( (firstBlog, secondBlog) => secondBlog.likes - firstBlog.likes )
        setBlogs(sorted)
      })
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

  const deleteBlog = async blog => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.remove(blog.id)
        setBlogs(blogs.filter(b => b.id !== blog.id))
        setMessage({ text: `Deleted ${blog.title} by ${blog.author} `, type: 'confirm' })
        setTimeout(() => {setMessage({ 'text': null,'type': null })}, 5000)
      } catch(exception) {
        console.log(exception)
        setMessage({ text: 'Blog delete failed', type: 'error' })
        setTimeout(() => {setMessage({ 'text': null,'type': null })}, 5000)
      }
    }
  }

  const updateBlog = async blog => {
    try {
      const updatedBlog = await blogService.modify({
        id: blog.id,
        author: blog.author,
        title: blog.title,
        url: blog.url,
        likes: blog.likes + 1,
        user: blog.user.id
      })
      console.log(updatedBlog)
      setBlogs(blogs.filter(b => b.id !== blog.id ? b : b.likes += 1 ))
      setMessage({ text: `Updated ${blog.title} by ${blog.author} `, type: 'confirm' })
      setTimeout(() => {setMessage({ 'text': null,'type': null })}, 5000)
    } catch(exception) {
      console.log(exception)
      setMessage({ text: 'Blog update failed', type: 'error' })
      setTimeout(() => {setMessage({ 'text': null,'type': null })}, 5000)
    }
  }

  const createBlog = async blog => {
    try {
      const newblog = await blogService.createNew(blog)
      setBlogs(blogs.concat(newblog))
      blogForm.current.toggleVisibility()
      setMessage({ text: `Added ${newblog.title} by ${newblog.author}`, type: 'confirm' })
      setTimeout(() => {setMessage({ 'text': null,'type': null })}, 5000)
    } catch (exception) {
      setMessage({ text: 'Failed to add new blog', type: 'error' })
      setTimeout(() => {setMessage({ 'text': null,'type': null })}, 5000)
    }
  }

  const showBlogs = () => (
    <>
      <p>{user.name} logged in <button onClick={() => logout()}>Logout</button></p>
      <Togglable buttonLabel='Create new' ref={blogForm}>
        <Create blogs={blogs} createBlog={createBlog} />
      </Togglable>
      <ul style={{ padding: '0'  }}>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} />
        )}
      </ul>
    </>
  )

  const loginForm = () => (
    <>
      <Togglable buttonLabel='Login' ref={blogForm}>
        <Login user={user} setUser={setUser} setMessage={setMessage} />
      </Togglable>
      <ul style={{ padding: '0'  }}>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} />
        )}
      </ul>
    </>
  )
  console.log(blogs)
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