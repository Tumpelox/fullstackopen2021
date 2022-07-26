import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Todo from './Todo'

describe('Showing one todo', () => {

  let component

  const buttonHandler = jest.fn()

  beforeEach(  () => {
    const todo = {
      _id: 'test',
      text: 'Test todo',
      done: false
    }

    component = render(
      <Todo todo={todo} onClickComplete={buttonHandler} onClickDelete={buttonHandler} />
    )
  })

  test('Render todo', () => {
    expect(component.container).toHaveTextContent('Test todo')
  })

  test('Press buttons', () => {
    const remove = component.container.querySelector('#deletebutton');
    const done = component.container.querySelector('#donebutton');

    fireEvent.click(done)
    fireEvent.click(remove)
    
    expect(buttonHandler.mock.calls).toHaveLength(2)
  })
})