import React from 'react'
import classes from './BlackDrop.module.css'
const BlackDrop =(props)=>{
  return(
    <div className={classes.BlackDrop}
    onClick={props.onClick}>
    </div>
  )
}
export default BlackDrop;