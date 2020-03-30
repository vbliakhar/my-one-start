import React from 'react'
import classses from './Input.module.css'

function isInvalid({valid,touched,shouldValidate}){
  return !valid && shouldValidate && touched
}

const Input =(props)=>{
  const inputType =props.type || 'text'
  const cls = [classses.Input]
  const htmlFor = `${inputType}-${Math.random()}`

 if(isInvalid(props)){
  cls.push(classses.invalid)
 }
  return(
    <div className={cls.join ("  ")}> 
      <label htmlFor={htmlFor}>{props.label}</label>
      <input 
        type={inputType}
        id={htmlFor}
        value={props.value}
        onChange={props.onChange}
      />
      {/* <span>{props.errorMessage
          ||"Enter the correct value"}
      </span> */}
      {
        isInvalid(props)
          ?<span>{props.errorMessage
          ||"Enter the correct value"}</span>
          :null
      }
    </div>
  )
}
export default Input;