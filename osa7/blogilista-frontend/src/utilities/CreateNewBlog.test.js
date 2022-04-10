import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Create from './CreateNewBlog'

test('Create new blog', () => {
  const createHandler = jest.fn()

  const blog = {
    author: 'Testperson',
    title: 'Test title',
    url: 'Google.fi',
    likes: 100,
    user: {
      name: 'Testuser'
    }
  }

  const component = render(
    <Create blog={blog} createBlog={createHandler} />
  )

  const author = component.container.querySelector('#author')
  const title = component.container.querySelector('#title')
  const url = component.container.querySelector('#url')

  const form = component.container.querySelector('form')

  fireEvent.change(author, { target: { value: 'DummuAuthor' } })
  fireEvent.change(title, { target: { value: 'DummuTitle' } })
  fireEvent.change(url, { target: { value: 'DummuUrl' } })

  fireEvent.submit(form)

  expect(createHandler.mock.calls).toHaveLength(1)
  expect(createHandler.mock.calls[0][0].author).toBe('DummuAuthor')
  expect(createHandler.mock.calls[0][0].title).toBe('DummuTitle')
  expect(createHandler.mock.calls[0][0].url).toBe('DummuUrl')
})
