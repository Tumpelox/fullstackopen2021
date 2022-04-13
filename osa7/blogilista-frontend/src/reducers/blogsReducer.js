import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { showMessage } from './messageReducer'

const blogsSlice = createSlice({
  name: 'blogs',
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
  const data = { likes: blog.likes + 1, id: blog.id }
  return async dispatch => {
    const updatedBlog = await blogService.modify(data)
    dispatch(modifyBlog(updatedBlog))
  }
}

export const commentBlog = (comment, id) => {
  return async dispatch => {
    const updatedBlog = await blogService.comment(comment, id)
    if (updatedBlog === 401) {
      dispatch(showMessage({ text: 'Comment sending failed. Please login to send comments', type: 'error' }, 5))
    } else {
      dispatch(modifyBlog(updatedBlog))
      dispatch(showMessage({ text: 'Comment sent', type: 'confirm' }, 5))
    }
  }
}


export const removeBlog = blog => {
  return async dispatch => {
    const response = await blogService.remove(blog.id)
    if (response !== 204) {
      dispatch(showMessage({ text: 'Blog delete failed', type: 'error' }, 5))
    } else {
      dispatch(deleteBlog(blog))
      dispatch(showMessage({ text: `Deleted ${blog.title} by ${blog.author} `, type: 'confirm' }, 5))
    }
  }
}

export const newBlog = blog => {
  return async dispatch => {
    const createdBlog = await blogService.createNew(blog)
    dispatch(appendBlog(createdBlog))
  }
}

export const initializeBlogs = () => {
  return async dispatch =>  {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export default blogsSlice.reducer