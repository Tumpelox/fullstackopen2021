import React, { useState } from 'react'
import blogsService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs, setMessage }) => {
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

  const deleteBlog = async blog => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await blogsService.remove(blog.id)
        setBlogs(blogs.filter(b => b.id !== blog.id))
        setMessage({ text: `Deleted ${blog.title} by ${blog.author} `, type: 'confirm' })
        setTimeout(() => {setMessage({ 'text': null,'type': null })}, 5000)
      } catch(exception) {
        console.log(exception)
        setMessage({ text: 'Blog delete failed', type: 'error' })
        setTimeout(() => {setMessage({ 'text': null,'type': null })}, 5000)
      }
    }
  }

  const updateBlog = async blog => {
    try {
      const updatedBlog = await blogsService.modify({
        id: blog.id,
        author: blog.author,
        title: blog.title,
        url: blog.url,
        likes: blog.likes + 1,
        user: blog.user.id
      })
      console.log(updatedBlog)
      setBlogs(blogs.filter(b => b.id !== blog.id ? b : b.likes += 1 ))
      setMessage({ text: `Updated ${blog.title} by ${blog.author} `, type: 'confirm' })
      setTimeout(() => {setMessage({ 'text': null,'type': null })}, 5000)
    } catch(exception) {
      console.log(exception)
      setMessage({ text: 'Blog update failed', type: 'error' })
      setTimeout(() => {setMessage({ 'text': null,'type': null })}, 5000)
    }
  }

  const showName = () => {
    if (blog.user.name) {
      return <p>{blog.user.name}</p>
    } else {
      return
    }
  }

  return (
    <div>
      <div onClick={() => setExpandBlog( expandBlog ? false : true)} style={blogStyle}>
        <p>{blog.title} -- {blog.author}<button onClick={() => deleteBlog(blog)}>Delete</button></p>
      </div>
      <div style={{ ...showWhenVisible, ...expandStyle }} >
        <p>URL: <a href={blog.url}>{blog.url}</a></p>
        <p>Likes: {blog.likes} <button onClick={() => updateBlog(blog)}>Like</button></p>
        {showName()}
      </div>
    </div>
  )}

export default Blog