import React from 'react'

const Total = (props) => {
    return props.exercises.reduce( (s, r) => s + r)
}
  
const CourseData = (props) => {
    const total = () => {
      return <Total exercises={props.parts.map( p => p.exercises)} />
    }
    return (
      <>
        <p><strong>Total of {total()} exercises</strong></p>
      </>
    )
}
  
const Part = (props) => {
    return (
      <p>{props.name} {props.exercises}</p>
    )
}
  
const Header = (props) => {
    return <h1>{props.text}</h1>
}
  
const Content = (props) => {
    return (
    <div>
      {
        props.parts.map((part) =>
          <Part key={part.id} name={part.name} exercises={part.exercises}/>
        )
      }
    </div>
    )
}
  
const Course = ({course}) => {
    return (
    <div key={course.id}>
        <Header text={course.name}/>
        <Content parts={course.parts}/>
        <CourseData parts={course.parts} />
    </div>
    )
}

export default Course