import React, { useState } from 'react'

const Filter = ({persons, setNameFilter}) => {
    const [newFilter, setNewFilter] = useState('')

    const handleChange = (event) => {
        setNewFilter(event.target.value)
        setNameFilter(persons.filter(person =>
            person.name.toLowerCase().includes(event.target.value.toLowerCase())
        ))
    }

    return (
        <div>
            <form>
                Etsi: <input
                id={"filter"}
                value={newFilter}
                onChange={handleChange} 
                />
            </form>
        </div>
    )
}

export default Filter