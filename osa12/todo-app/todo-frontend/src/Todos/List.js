import React from 'react'
import Todo from './Todo'

const TodoList = ({ todos, deleteTodo, completeTodo }) => {
  const onClickDelete = (todo) => {
    deleteTodo(todo)
  }

  const onClickComplete = (todo) => {
    completeTodo(todo)
  }

  return (
    <>
      {todos.map((todo, index) => {
        return <Todo todo={todo} onClickComplete={onClickComplete} onClickDelete={onClickDelete} key={index} />
      }).reduce((acc, cur, index) => [...acc, <hr key={index + 1000}/>, cur], [])}
    </>
  )
}

export default TodoList
