import React from 'react'
import classes from './FinishedQuiz.module.css'
import Button from '../UI/Button/Button'
const FinishedQuiz =(props)=>{
  const successCount = Object.keys(props.results).reduce((total,key)=>{
    if (props.results[key]==='success'){
      total++
    }
    return total
  },0)
  return (
    <div className={classes.FinishedQuiz}>
      <ul>
        {props.quiz.map((quiz,index)=>{
          const cls=[
            classes[props.results[quiz.id]==="error"?"error":"cross"]
          ]
          return(
            <li
              key={index}
            >
            <strong>{index+1}</strong>.&nbsp;
            {quiz.question}
            <i className={cls.join(" ")}></i>
     
            </li>
          )
         
        })}
      </ul>
      <p>Right {successCount} out of {props.quiz.length}</p>
      <div>
        <Button 
          onClick={props.onRetry}
          type="primary"  
          >
            Repit
          </Button>  
          <Button
           type="success"
          >
            Go to the test list
          </Button>
      </div>
    </div>
  )
}
export default FinishedQuiz;