import Axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await Axios.get(baseUrl)
  return response.data
}

const createNew = async content => {
  const body = { content, votes: 0}
  const response = await Axios.post(baseUrl, body)
  return response.data
}

const modify = async ( id, content ) => {
  const response = await Axios.put(baseUrl + '/' + id, content)
  return response.data
}

export default { getAll, createNew, modify } // eslint-disable-line import/no-anonymous-default-export