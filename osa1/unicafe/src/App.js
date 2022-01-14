import React, { useState } from 'react'

const Button = ({handleClick, text}) => {
  return <button onClick={handleClick}>{text}</button>
}

const StatisticLine = ({value, text}) => {
  return (
    <tr>
      <td>
        {text} 
      </td>
      <td>
        {value}
      </td>
    </tr>
  )
}

const Statistic = ({good, neutral, bad}) => {
  if (bad + good + neutral > 0) {
    return (
      <table>
        <tbody>
          <StatisticLine value={good} text="good" />
          <StatisticLine value={neutral} text="neutral" />     
          <StatisticLine value={bad} text="bad" />
          <StatisticLine value={good + neutral + bad} text="all" /> 
          <StatisticLine value={(good - bad)/(good + neutral + bad)} text="average" /> 
          <StatisticLine value={(good / (good + neutral + bad)) * 100 + "%"} text="positive" />       
        </tbody>
      </table>
    )
  } else {
    return <p>No feedback given</p>
  }
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addFeedback = (type) => {
    if (type === "good") {
      setGood(good + 1)
    } else if (type === "neutral"){
      setNeutral(neutral + 1)
    } else {
      setBad(bad + 1)
    }
  }

  return (
    <div>
      <div>
        <h1>give feedback</h1>
        <Button handleClick={() => addFeedback("good")} text="good" />
        <Button handleClick={() => addFeedback("neutral")} text="neutral" />
        <Button handleClick={() => addFeedback("bad")} text="bad" />
      </div>

      <Statistic good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
