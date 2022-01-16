import React from 'react'
import {Header, Button} from './Utilities.js'
import numberService from '../services/Axios.js'

const Number = ({person, handleChange}) => {
    return <p>{person.name} {person.number} <Button handleChange={handleChange} t={"Poista"} /></p>
  }

const Numbers = ({persons, nameFilter, setPersons, setMessage}) => {
    const nameList = () => nameFilter.map(person => person.name)

    const removeNumber = contactId => {
      if (window.confirm(`Poistetaanko ${persons.find(person => person.id ===  contactId).name}?`))
      numberService
      .remove(contactId)
      .then(response => {
          setPersons(persons.filter(person => person.id !== contactId))
          setMessage({
            "text": `Henkilö ${persons.find(person => person.id ===  contactId).name} poistettu`,
            "type": "confirm",
            "isMessage": true
          })
      })

      setTimeout(() => {
        setMessage({
          "text": ``,
          "type": "",
          "isMessage": false
        })
      }, 5000)
      
    }
  
    const personFilter = () => {
        if (nameFilter.length > 0) {
            return persons.filter(person =>
            nameList().includes(person.name)
        )} else {
            return persons
        }
    }
  
    return (
      <div>
        <Header t={"Numerot"}/>
        {personFilter().map((person, id) => {
          return <Number key={id} person={person} handleChange={() => removeNumber(person.id)} /> 
        })}
      </div>
    )
}

export default Numbers