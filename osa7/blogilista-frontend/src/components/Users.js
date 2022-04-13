import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
  const users = useSelector(state => state.users.all)

  const listUsers = () => {
    if (users !== null) {
      return (
        users.map(user =>
          <tr key={user.id}>
            <td><Link to={'/users/' + user.id}>{user.name ? user.name : user.username}</Link></td>
            <td>{user.blogs.length}</td>
          </tr>
        )
      )
    }
  }

  if (users !== null) {
    return (
      <table style={{ padding: '0'  }}>
        <thead>
          <tr>
            <td>User</td>
            <td>Blogs created</td>
          </tr>
        </thead>
        <tbody>
          {listUsers()}
        </tbody>
      </table>
    )
  } else {
    return (<ul></ul>)
  }
}

export default Users