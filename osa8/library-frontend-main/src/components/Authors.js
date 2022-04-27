import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'
import SetBirth from './SetBirth'

const Authors = (props) => {
  const authors = useQuery(ALL_AUTHORS)

  if (authors.loading || !props.show) {
    return null
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <SetBirth authors={authors.data.allAuthors} />
    </div>
  )
}

export default Authors
