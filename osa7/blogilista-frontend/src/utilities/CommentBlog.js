import React, { useState } from 'react'
import { commentBlog } from '../reducers/blogsReducer'
import { useDispatch } from 'react-redux'

const CommentBlog = ({ id }) => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()

  const handleCreate = async (event) => {
    event.preventDefault()
    dispatch(commentBlog(comment,id))
    setComment('')
  }

  return (
    <form onSubmit={handleCreate}>
      <div>
        comment:
        <input
          id='comment'
          type='text'
          name='Comment'
          value={comment}
          onChange={ ({ target }) => setComment(target.value) }
        />
      </div>
      <button type='submit' id='create'>Comment</button>
    </form>
  )
}

export default CommentBlog