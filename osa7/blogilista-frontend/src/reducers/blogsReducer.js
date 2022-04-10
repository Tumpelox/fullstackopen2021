import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogsSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    modifyBlog(state, action) {
      const blog = action.payload
      state = state.map(b => b.id === blog.id ? blog : b)
      return state
    },
    deleteBlog(state, action) {
      const blog = action.payload
      state = state.filter(b => b.id !== blog.id)
      return state
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      state = action.payload
      state.sort( (first, second) => second.likes - first.likes )
      return state
    },
  }
})

export const { modifyBlog, deleteBlog, appendBlog, setBlogs } = blogsSlice.actions

export const voteBlog = blog => {
  const data = {
    id: blog.id,
    author: blog.author,
    title: blog.title,
    url: blog.url,
    likes: blog.likes + 1,
    user: blog.user.id
  }
  return async dispatch => {
    const updatedBlog = await blogService.modify(data)
    dispatch(modifyBlog(updatedBlog))
  }
}

export const removeBlog = blog => {
  return async dispatch => {
    const removedBlog = await blogService.remove(blog.id)
    dispatch(deleteBlog(removedBlog))
  }
}

export const createBlog = blog => {
  return async dispatch => {
    const createdBlog = await blogService.createNew(blog)
    dispatch(appendBlog(createdBlog))
  }
}

export const initializeBlogs = () => {
  return async dispatch =>  {
    const blogs = blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export default blogsSlice.reducer