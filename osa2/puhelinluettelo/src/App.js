import React, { useState, useEffect } from 'react'
import numberService from './services/Axios.js'

import AddNewNumber from './components/AddNewNumber.js'
import Filter from './components/Filter.js'
import Numbers from './components/Numbers.js'
import {Header, Message} from './components/Utilities.js'

const App = () => {
  const [persons, setPersons] = useState([])
  const [nameFilter, setNameFilter] = useState([])
  const [message, setMessage] = useState(
    {
    "text": "",
    "type": "",
    "isMessage": false
    }
  )

  useEffect( () => {
    numberService
    .getAll()
    .then(response => {
      setPersons(response)
    })
  },[])

  return (
    <div>
      <Header t={"Puhelinluettelo"} />

      <Message 
      t={message.text} 
      type={message.type} 
      isMessage={message.isMessage}
      />

      <Filter 
      persons={persons} 
      setNameFilter={setNameFilter} 
      />

      <AddNewNumber 
      persons={persons}
      setPersons={setPersons}
      setMessage={setMessage}
      />

      <Numbers 
      persons={persons} 
      nameFilter={nameFilter}
      setPersons={setPersons}
      setMessage={setMessage}
      />
    </div>
  )

}

export default App