import React, { useState, useEffect } from 'react'
import Axios from 'axios'

import ShowCountries from './components/ShowCountries.js'
import Filter from './components/Filter.js'
import {Header} from './components/Utils.js'


const App = () => {
  const [countries, setCountries] = useState([])
  const [countryFilter, setCountryFilter] = useState([])

  useEffect(() => {
    Axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => setCountries(response.data))
  }, [])

  return (
    <div>
      <Header text={"Maiden tiedot"} />

      <Filter 
      countries={countries} 
      setCountryFilter={setCountryFilter} 
      />

      <ShowCountries 
      countries={countries} 
      countryFilter={countryFilter}
      setCountryFilter={setCountryFilter}
      />
    </div>
  )

}

export default App
