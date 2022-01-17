import React, { useState } from 'react'
import numberService from '../services/Axios.js'
import {Button} from './Utilities.js'

const AddNewNumber = ({persons, setPersons, setMessage}) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const handleChange = (event) => {
        if (event.target.id === "name") {
        setNewName(event.target.value)
        } else {
        setNewNumber(event.target.value)
        }
    }

    const addNumber = (event) => {
        event.preventDefault()
        let isSame = persons.find(person => person.name === newName);

        const numberInfo = {
            name: newName,
            number: newNumber,
        }

        if (!isSame) {
            numberService
            .create(numberInfo)
            .then(response => {
                setMessage({
                    "text": `Henkilö ${newName} lisätty luetteloon`,
                    "type": "confirm",
                    "isMessage": true
                })
                setPersons(persons.concat(response))
            })
        } else if (isSame && window.confirm(`Henkilö ${newName} on jo luettelossa. Päivitetäänkö numero?`)) {
            let personId = persons.find(person => person.name === newName).id
                numberService
                .update(personId, numberInfo)
                .then(response => {
                    setMessage({
                        "text": `Henkilön ${newName} numero päivitetty`,
                        "type": "confirm",
                        "isMessage": true
                    })
                    setPersons(persons.map(person => person.id === response.id ? response : person))
                })
                .catch(error => {
                    setMessage({
                        "text": `Henkilön ${newName} tietoja ei löytynyt palvelimelta`,
                        "type": "error",
                        "isMessage": true
                    })
                })
        }

        setNewName('')
        setNewNumber('')
        setTimeout(() => {
            setMessage({
              "text": ``,
              "type": "",
              "isMessage": false
            })
          }, 5000)
    }

    return (
    <form onSubmit={addNumber}>
        <div>
            nimi: <input 
                id={"name"}
                value={newName}
                onChange={handleChange}
            />
            </div>
            <div>
            puhelinnumero: <input 
                id={"number"}
                value={newNumber}
                onChange={handleChange}
            />
        </div>
        <div>
        <Button type={"submit"} t={"Lisää"} />
        </div>
    </form>
    )
}

export default AddNewNumber