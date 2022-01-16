import React from 'react'
import {Button} from './Utils.js'

const Country = ({country, handleClick, text}) => {
  return <p>{country} <Button handleClick={handleClick} text={text} /> </p>
}

const Countries = ({countries, countryFilter, setCountryFilter}) => {
    const nameList = () => countryFilter.map(country => country.name.common)
  
    const countryNameFilter = () => {
        if (countryFilter.length > 0) {
            return countries.filter(country =>
            nameList().includes(country.name.common)
        )} else {
            return countries
        }
    }

    const oneCountry = (country) => {
      let countryArr = new Array(country.country);
      setCountryFilter(countryArr)
    }

    return (
      <div>
        {countryNameFilter().map((country, id) => {
          return <Country key={id} country={country.name.common} text={'Näytä'} handleClick={() => oneCountry({country})} />
        })}
      </div>
    )
}

export default Countries