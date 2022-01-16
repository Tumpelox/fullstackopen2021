import React from 'react' 

const Button = ({handleChange, t, type}) => <button type={type} onClick={handleChange}>{t}</button>

const Header = ({t}) => <h2>{t}</h2>

const Message = ({t, type, isMessage}) => {
    const messageStyle = () => {
        var outputStyles = {};
        if (type !== 'error') {
            outputStyles = {
                color: "rgb(255, 255, 255)",
                padding: "15px 20px",
                background: "#4dbb60",
                border: "2px solid #48b15a",
                borderRadius: "4px",
                margin: "10px",
                fontSize: "17px"
            }
        } else {
            outputStyles = {
                color: "rgb(255, 255, 255)",
                padding: "15px 20px",
                background: "#af4848",
                border: "2px solid #893939",
                borderRadius: "4px",
                margin: "10px",
                fontSize: "17px"
            }
        }
        return outputStyles
    }
    if (isMessage) {
        return (
            <div style={messageStyle()}>
                <p style={{margin: "0px"}}>{t}</p>
            </div>
        )
    } else {
        return <></>
    }
}
export { Button, Header, Message}