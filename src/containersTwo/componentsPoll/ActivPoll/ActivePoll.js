import React from 'react'
import classes from './ActivePoll.module.css'
const ActivePoll=(props)=>{
  return(
    <div className={classes.ActivePoll}>
      <p className={classes.Question}>
        <span>
          <strong>{props.activeQuestion}.</strong>&nbsp;
            {props.question}
        </span>
        <small>{props.activeQuestion} out of {props.pollLength}</small>
      </p>
        <ul>
            {props.answer.map((line,index)=>(
              <li 
              key={index}
              onClick={()=>props.answerClick(line.id)}
              >
            
                  {line.myText}
              </li>
            ))
            } 
        </ul>
    </div>
  )
}
export default ActivePoll;