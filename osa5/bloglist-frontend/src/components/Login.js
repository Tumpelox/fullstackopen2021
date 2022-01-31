import React, { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
const Login = ({ setUser, setMessage }) => {
  const [username, setUsername] = useState([])
  const [password, setPassword] = useState([])
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const newUser = await loginService.login({
        username, password
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(newUser))
      blogService.setToken(newUser.token)
      setUser(newUser)
      setUsername('')
      setPassword('')
      setMessage({ text: `Welcome back${newUser.name !== undefined ? ', ' + newUser.name : '' }`, type: 'confirm' })
      setTimeout(() => {setMessage({ 'text': null,'type': null })}, 5000)
    } catch (exception) {
      setMessage({ text: 'Wrong username or password', type: 'error' })
      setTimeout(() => {setMessage({ 'text': null,'type': null })}, 5000)
    }
  }
  return(
    <form onSubmit={handleLogin}>
      <div>
          Username:
        <input
          type='text'
          value={username}
          name='Username'
          onChange={ ( { target } ) => setUsername(target.value)}
        />
      </div>
      <div>
          Password:
        <input
          type='password'
          value={password}
          name='Password'
          onChange={ ( { target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit'>Login</button>

    </form>
  )
}

export default Login