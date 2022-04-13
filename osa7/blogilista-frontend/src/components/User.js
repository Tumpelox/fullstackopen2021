import React from 'react'
import Blog from '../utilities/BlogCard'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const User = () => {
  const id = useParams().id.toString()
  var blogs = useSelector(state => state.blogs)
  var user = useSelector(state => state.users.all)

  if (blogs !== null && user !== null) {
    blogs = blogs.filter(b => b.user.id === id)
    user = user.filter(u => u.id === id)[0]
    return (
      <>
        <h2>{user.name ? user.name : user.username}</h2>
        <p>Created blogs</p>
        <ul style={{ padding: '0'  }}>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </ul>
      </>
    )
  } else {
    return (<ul></ul>)
  }
}

export default User