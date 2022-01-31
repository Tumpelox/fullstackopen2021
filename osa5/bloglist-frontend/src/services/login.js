import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/login'

const login = async credentials =>  {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

const userData = async () => {
  const response = await axios.get('http://localhost:3003/api/users')
  return response.data
}

export default { login, userData }