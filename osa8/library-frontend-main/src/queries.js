import { gql } from '@apollo/client'

export const ADD_BOOK = gql`
  mutation ($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook(
    title: $title,
    author: $author, 
    published: $published,
    genres: $genres
  ){title}
}
`

export const ALL_BOOKS = gql`
query {
  allBooks {
    title,
    author,
    published
    id
  },
}
`

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    bookCount,
    name,
    born,
    id,
  }
}
`

export const SET_BIRTH = gql`
  mutation ($name: String!, $birth: Int!) {
    editAuthor(
      name: $name, 
      setBornTo: $birth
    ){
      name,
      id,
      born,
      bookCount
    }
}
`