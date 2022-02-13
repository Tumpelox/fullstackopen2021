import React, { useState } from 'react'

const Blog = ({ blog, deleteBlog, updateBlog }) => {
  const [expandBlog, setExpandBlog] = useState(false)

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