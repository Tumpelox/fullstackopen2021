import React, { useState } from 'react'
import blogsService from '../services/blogs'

const CreateNewBlog = ({ blogs, setBlogs, setMessage }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = async (event) => {
    event.preventDefault()
    try {
      const newblog = await blogsService.createNew({
        author,
        title,
        url,
      })
      setBlogs(blogs.concat(newblog))
      setTitle('')
      setAuthor('')
      setUrl('')
      setMessage({ text: `Added ${newblog.title} by ${newblog.author}`, type: 'confirm' })
      setTimeout(() => {setMessage({ 'text': null,'type': null })}, 5000)
    } catch (exception) {
      setMessage({ text: 'Failed to add new blog', type: 'error' })
      setTimeout(() => {setMessage({ 'text': null,'type': null })}, 5000)
    }
  }

  return (
    <form onSubmit={handleCreate}>
      <div>
            Title:
        <input
          type='text'
          name='Title'
          value={title}
          onChange={ ({ target }) => setTitle(target.value) }
        />
      </div>
      <div>
          Author:
        <input
          type='text'
          name='Author'
          value={author}
          onChange={ ({ target }) => setAuthor(target.value) }
        />
      </div>
      <div>
          URL:
        <input
          type='text'
          name='Url'
          value={url}
          onChange={ ({ target }) => setUrl(target.value) }
        />
      </div>
      <button type='submit'>Create</button>
    </form>
  )
}

export default CreateNewBlog