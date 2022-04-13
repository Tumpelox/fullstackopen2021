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

const comment = async (content, id) => {
  const config = {
    headers: { Authorization: token },
  }

  if (content.length > 0) {
    try {
      const request = await axios.post(baseUrl + id + '/comments', { comment: content }, config)
      return request.data
    } catch (exception) {
      return 401
    }
  }
}


const modify = async blog => {
  var type = undefined
  var content = blog
  if (blog.likes) {
    type = '/likes'
    content = 'like'
  }
  const request = await axios.put(baseUrl + blog.id + type, content)
  return request.data
}

const remove = async id => {
  const config = {
    headers: { Authorization: token },
  }
  try {
    const request = await axios.delete(baseUrl + id, config)
    return request.status
  } catch(exception) {
    return
  }
}


export default { getAll, createNew, comment, modify, remove, setToken }