import React from 'react'

const Header = ({text}) => {
    return <h2>{text}</h2>
}

const Button = ({handleClick, text}) => {
    return <button onClick={handleClick}>{text}</button>
}

export {Header, Button}