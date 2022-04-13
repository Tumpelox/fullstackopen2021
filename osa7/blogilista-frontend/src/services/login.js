import axios from 'axios'

const baseUrl = 'http://localhost:3003'

const login = async credentials =>  {
  const response = await axios.post(baseUrl + '/api/login', credentials)
  return response.data
}

const userData = async () => {
  const response = await axios.get(baseUrl + '/api/users')
  return response.data
}

export default { login, userData }