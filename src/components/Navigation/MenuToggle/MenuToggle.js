import React from 'react'
import classes from './MenuToggle.module.css'

const MenuToggle = props =>{
  const cls = [
    classes.MenuToggle,
  ]
  if(props.isOpen){
    cls.push(classes.fatimes)
    cls.push(classes.open)
  }
  else{
    cls.push(classes.fabars)
  }
  return (
    <i
      className={cls.join(" ")}
      onClick={props.onToggle }
    />
  )
}
export default MenuToggle;