import React from 'react'

const Notification = ({ message }) => {
  const messageStyle = () => {
    var outputStyles = {}
    if (message.type !== 'error') {
      outputStyles = {
        color: 'rgb(255, 255, 255)',
        padding: '15px 20px',
        background: '#4dbb60',
        border: '2px solid #48b15a',
        borderRadius: '4px',
        margin: '10px',
        fontSize: '17px'
      }
    } else {
      outputStyles = {
        color: 'rgb(255, 255, 255)',
        padding: '15px 20px',
        background: '#af4848',
        border: '2px solid #893939',
        borderRadius: '4px',
        margin: '10px',
        fontSize: '17px'
      }
    }
    return outputStyles
  }
  if (message.text) {
    return (
      <div style={messageStyle()}>
        <p style={{ margin: '0px' }}>{message.text}</p>
      </div>
    )
  } else {
    return <></>
  }
}

export default Notification