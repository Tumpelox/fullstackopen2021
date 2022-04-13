import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { removeBlog, voteBlog } from '../reducers/blogsReducer'
import { showMessage } from '../reducers/messageReducer'
import { Link } from 'react-router-dom'

const BlogCard = ({ blog }) => {
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

  const deleteBlog = async blog => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(removeBlog(blog))
    }
  }

  const updateBlog = async blog => {
    try {
      dispatch(voteBlog(blog))
      dispatch(showMessage({ text: `Updated ${blog.title} by ${blog.author} `, type: 'confirm' }, 5))
    } catch(exception) {
      dispatch(showMessage({ text: 'Blog update failed', type: 'error' }, 5))
    }
  }

  return (
    <li className='blog' style={{ listStyle: 'none'  }}>
      <div onClick={() => setExpandBlog( expandBlog ? false : true)} style={blogStyle}>
        <p><Link to={'/blogs/' + blog.id}>{blog.title} -- {blog.author}</Link><button className='deleteButton' onClick={() => deleteBlog(blog)}>Delete</button></p>
      </div>
      <div style={{ ...showWhenVisible, ...expandStyle }} >
        <p>URL: <a href={blog.url}>{blog.url}</a></p>
        <p>Likes: {blog.likes} <button className='likeButton' onClick={() => updateBlog(blog)}>Like</button></p>
        <p>{blog.user.name ? blog.user.name : blog.user.username}</p>
      </div>
    </li>
  )}

export default BlogCard