import React from 'react'
import CommentBlog from '../utilities/CommentBlog'
import { useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'

const Blog = () => {
  const id = useParams().id.toString()
  const blogs = useSelector(state => state.blogs)

  if (blogs !== null) {
    const blog = blogs.filter(b => b.id === id)[0]
    return (
      <div>
        <h2>{blog.title}</h2>
        <a href={blog.url}>{blog.url}</a>
        <p>{blog.likes}</p>
        <p>added by <Link to={'/users/' + blog.user.id}> {blog.user.name ? blog.user.name : blog.user.username}</Link></p>
        <div>
          <CommentBlog id={blog.id} />
          <ul>
            {blog.comments.map(c =>
              <p key={c}>{c}</p>
            )}
          </ul>
        </div>
      </div>
    )
  } else {
    return (<div></div>)
  }
}

export default Blog