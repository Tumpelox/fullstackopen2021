import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { removeBlog } from '../reducers/blogsReducer'

const Blog = () => {
  const [expandBlog, setExpandBlog] = useState(false)

  const dispatch = useDispatch()

  const showWhenVisible = { display: expandBlog ? '' : 'none' }

  const blogStyle = {
    padding: '10px 5px',
    margin: '10px 0 0',
    backgroundColor: '#c7c7c7',
    border: '1px solid gray'
  }

  const expandStyle = {
    padding: '10px 5px',
    backgroundColor: '#e5e5e5',
    border: '1px solid gray'
  }

  const showName = () => {
    if (blog.user.name) {
      return <p>{blog.user.name}</p>
    } else {
      return
    }
  }

  const deleteBlog = async blog => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        dispatch(removeBlog(blog))
        dispatch(setMessage({ text: `Deleted ${blog.title} by ${blog.author} `, type: 'confirm' }, 5))
      } catch(exception) {
        dispatch(setMessage({ text: 'Blog delete failed', type: 'error' }, 5))
      }
    }
  }

  const updateBlog = async blog => {
    try {
      dispatch(voteBlog(blog))
      dispatch(setMessage({ text: `Updated ${blog.title} by ${blog.author} `, type: 'confirm' }, 5))
    } catch(exception) {
      dispatch(setMessage({ text: 'Blog update failed', type: 'error' }, 5))
    }
  }

  const createBlog = async blog => {
    try {
      blogForm.current.toggleVisibility()
      dispatch(createBlog(blog))
      dispatch(setMessage({ text: `Added ${blog.title} by ${blog.author}`, type: 'confirm' }, 5))
    } catch (exception) {
      dispatch(setMessage({ text: 'Failed to add new blog', type: 'error' }, 5))
    }
  }

  return (
    <li className='blog' style={{ listStyle: 'none'  }}>
      <div onClick={() => setExpandBlog( expandBlog ? false : true)} style={blogStyle}>
        <p>{blog.title} -- {blog.author}<button className='deleteButton' onClick={() => deleteBlog(blog)}>Delete</button></p>
      </div>
      <div style={{ ...showWhenVisible, ...expandStyle }} >
        <p>URL: <a href={blog.url}>{blog.url}</a></p>
        <p>Likes: {blog.likes} <button className='likeButton' onClick={() => updateBlog(blog)}>Like</button></p>
        {showName()}
      </div>
    </li>
  )}

export default Blog