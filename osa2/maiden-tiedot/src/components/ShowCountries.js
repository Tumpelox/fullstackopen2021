import React from 'react'

import Countries from './Countries.js'
import Country from './Country.js'

const ShowCountries = ({countries, countryFilter, setCountryFilter}) => {
    if (countryFilter.length === 0) {
      return <p>Etsi haluamasi maa hakukentän avulla</p>
    } else if (countryFilter.length > 10) {
      return <p>Liikaa kohteita. Tarkenna hakuasi</p>
    }else if (countryFilter.length > 1) {
      return (
        <Countries 
        countries={countries}
        countryFilter={countryFilter}
        setCountryFilter={setCountryFilter} 
        />
      )
    } else {
      return <Country country={countryFilter[0]} />
    }
  }

export default ShowCountries