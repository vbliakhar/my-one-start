import React from 'react'
import classes from './FinishedQuiz.module.css'

const FinishedQuiz =(props)=>{
  return (
    <div className={classes.FinishedQuiz}>
      <ul>
        <li>
          <strong>1. </strong>
          How are you
          <i className={classes.error}></i>
        </li>
        <li>
          <strong>2. </strong>
          How are you
          <i className={classes.cross}></i>
        </li>
      </ul>
      <p>Right 4 out of 10</p>
      <div>
        <button
        >repeat</button>
      </div>
    </div>
  )
}
export default FinishedQuiz;