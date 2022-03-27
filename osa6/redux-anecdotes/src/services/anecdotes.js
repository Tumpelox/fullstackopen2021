import Axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await Axios.get(baseUrl)
  return response.data
}

export { getAll }