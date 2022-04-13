import React from 'react'
import Blog from '../utilities/BlogCard'
import { useSelector } from 'react-redux'

const Blogs = () => {
  const blogs = useSelector(state => state.blogs)

  if (blogs !== null) {
    return (
      <ul style={{ padding: '0'  }}>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </ul>
    )
  } else {
    return (<ul></ul>)
  }
}

export default Blogs