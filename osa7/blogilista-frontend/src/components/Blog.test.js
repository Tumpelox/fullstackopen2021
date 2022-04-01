import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('Showing one blog', () => {
  let component

  const buttonHandler = jest.fn()

  beforeEach( () => {
    const blog = {
      author: 'Testperson',
      title: 'Test title',
      url: 'Google.fi',
      likes: 100,
      user: {
        name: 'Testuser'
      }
    }

    component = render(
      <Blog blog={blog} updateBlog={buttonHandler} deleteBlog={buttonHandler} />
    )
  })
  test('Render blog', () => {

    expect(component.container).toHaveTextContent('Test title -- Testperson')
  })

  test('View more', () => {
    const button = component.container.querySelector('li')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent('Likes: 100')
    expect(component.container).toHaveTextContent('URL: Google.fi')
  })

  test('Like button', () => {
    const open = component.container.querySelector('li')
    fireEvent.click(open)

    const like = component.container.querySelector('.likeButton')
    fireEvent.click(like)
    fireEvent.click(like)

    expect(buttonHandler.mock.calls).toHaveLength(2)
  })

  test('Delete blog', () => {
    const open = component.container.querySelector('li')
    fireEvent.click(open)

    const like = component.container.querySelector('.deleteButton')
    fireEvent.click(like)

    expect(buttonHandler.mock.calls).toHaveLength(1)
  })
})