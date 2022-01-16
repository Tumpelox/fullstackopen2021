import React, { useState } from 'react'

const Filter = ({persons, nameFilter, setNameFilter}) => {
    const [newFilter, setNewFilter] = useState('')

    const handleChange = async (event) => {
        await setNewFilter(event.target.value)
        await setNameFilter(persons.filter(person =>
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