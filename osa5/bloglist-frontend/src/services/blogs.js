import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/blogs/'

var token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const createNew = async blog => {
  const config = {
    headers: { Authorization: token },
  }

  const request = await axios.post(baseUrl, blog, config)
  return request.data
}

const modify = async blog => {
  console.log(blog)
  const request = await axios.put(baseUrl + blog.id, blog)
  return request.data
}

const remove = async id => {
  const config = {
    headers: { Authorization: token },
  }

  const request = await axios.delete(baseUrl + id, config)
  return request.data
}


export default { getAll, createNew, modify, remove, setToken }