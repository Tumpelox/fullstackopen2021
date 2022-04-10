import React, { useState } from 'react'

const CreateNewBlog = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = async (event) => {
    event.preventDefault()
    createBlog({
      author,
      title,
      url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={handleCreate}>
      <div>
            Title:
        <input
          id='title'
          type='text'
          name='Title'
          value={title}
          onChange={ ({ target }) => setTitle(target.value) }
        />
      </div>
      <div>
          Author:
        <input
          id='author'
          type='text'
          name='Author'
          value={author}
          onChange={ ({ target }) => setAuthor(target.value) }
        />
      </div>
      <div>
          URL:
        <input
          id='url'
          type='text'
          name='Url'
          value={url}
          onChange={ ({ target }) => setUrl(target.value) }
        />
      </div>
      <button type='submit' id='create'>Create</button>
    </form>
  )
}

export default CreateNewBlog