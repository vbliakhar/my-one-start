import React from 'react'
import classes from './AnswerList.module.css'
import AnswerItem from './AnswerItem/AnswerItem'

const AnswerList =props=>(
    <ul className={classes.AnswerList}>
       {props.answers.map((answer,index)=>{
           return(
               <AnswerItem
							 	key={index}
								answer={answer}
								onAnswerClick={props.onAnswerClick}
               />
           )
    })   
    }
      {/* <AnswerItem
				answer={props.answers}
			/> */}
    </ul>
)
export default AnswerList;