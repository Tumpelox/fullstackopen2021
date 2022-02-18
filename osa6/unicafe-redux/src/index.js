import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer/reducer'

const store = createStore(reducer)

const App = () => {
  const buttonAction = (type) => {
    store.dispatch({
      type
    })
  }

  return (
    <div>
      <button onClick={() => buttonAction('GOOD')}>good</button>
      <button onClick={() => buttonAction('OK')}>ok</button>
      <button onClick={() => buttonAction('BAD')}>bad</button>
      <button onClick={() => buttonAction('ZERO')}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)