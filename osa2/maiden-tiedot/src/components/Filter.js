import React, { useState } from 'react'

const Filter = ({countries, setCountryFilter}) => {
    const [newFilter, setNewFilter] = useState('')

    const handleChange =  (event) => {
        setNewFilter(event.target.value)
        setCountryFilter(countries.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase())
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