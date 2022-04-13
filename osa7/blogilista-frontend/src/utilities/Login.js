import React, { useState } from 'react'
import { loginUser } from '../reducers/userReducer'
import { showMessage } from '../reducers/messageReducer'
import { useDispatch } from 'react-redux'

const Login = () => {
  const [username, setUsername] = useState([])
  const [password, setPassword] = useState([])

  var dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      setUsername('')
      setPassword('')
      dispatch(loginUser(username, password))
    } catch (exception) {
      dispatch(showMessage({ text: 'Wrong username or password', type: 'error' }, 5))
    }
  }
  return(
    <form onSubmit={handleLogin}>
      <div>
          Username:
        <input
          type='text'
          id="username"
          value={username}
          name='Username'
          onChange={ ( { target } ) => setUsername(target.value)}
        />
      </div>
      <div>
          Password:
        <input
          type='password'
          id="password"
          value={password}
          name='Password'
          onChange={ ( { target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit' id="login">Login</button>

    </form>
  )
}

export default Login