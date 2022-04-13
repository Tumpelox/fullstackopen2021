import React, { useRef } from 'react'
import Togglable from '../utilities/Togglable'
import Create from '../utilities/CreateNewBlog'
import Login from '../utilities/Login'
import { useSelector, useDispatch } from 'react-redux'
import { showMessage } from '../reducers/messageReducer'
import { newBlog } from '../reducers/blogsReducer'
import { logoutUser } from '../reducers/userReducer'

const Form = () => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.users.user)
  const blogForm = useRef()

  const logout = () => {
    dispatch(showMessage({ text: `Logged out ${user.name !== undefined ? user.name : ''}`, type: 'confirm' }, 5))
    dispatch(logoutUser())
  }

  const createBlog = async blog => {
    try {
      blogForm.current.toggleVisibility()
      dispatch(newBlog(blog))
      dispatch(showMessage({ text: `Added ${blog.title} by ${blog.author}`, type: 'confirm' }, 5))
    } catch (exception) {
      dispatch(showMessage({ text: 'Failed to add new blog', type: 'error' }, 5))
    }
  }

  const showCreate = () => {
    return (
      <>
        <p>{user.name} logged in <button onClick={() => logout()}>Logout</button></p>
        <Togglable buttonLabel='Create new' ref={blogForm}>
          <Create createBlog={createBlog}/>
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
    <>
      {user === null ?
        loginForm() :
        showCreate()
      }
    </>
  )
}

export default Form