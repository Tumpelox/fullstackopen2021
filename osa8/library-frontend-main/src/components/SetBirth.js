import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, SET_BIRTH } from '../queries'
import Select from 'react-select'

const SetBirth = ({ authors }) => {
  const [ name, setName ] = useState(null)
  const [ birth, setBirth ] = useState('')

  const [ updateAuthor ] = useMutation(SET_BIRTH, { refetchQueries: [ {query: ALL_AUTHORS} ] })

  if (authors === undefined) {
    return null
  }

  const options = authors.map(a => {
    return { value: a.name, label: a.name }
  })

  const updateBirth = (event) => {
    event.preventDefault()

    updateAuthor({ variables: { name: name.value, birth: parseInt(birth) } })

    setName(null)
    setBirth('')
  }
  return (
    <form onSubmit={updateBirth}>
      <h3>Set author birth</h3>
      <Select 
        defaultValue={name}
        onChange={setName}
        options={options}
      />
      <input type="number" value={birth} onChange={({target}) => setBirth(target.value)} />
      <button type='submit'>Update</button>
    </form>
  )
}

export default SetBirth