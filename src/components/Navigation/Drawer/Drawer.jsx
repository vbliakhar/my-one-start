import React, {Component} from 'react'
import classes from './Drawer.module.css'
import BlackDrop from '../../UI/BlakDrop/BlackDrop'
import {NavLink} from 'react-router-dom'
const links = [
  {to: '/', label: 'list', exact:true },
  {to: '/auth', label: 'Authorization', exact:false },
  {to: '/quiz-creator', label: 'Create a test', exact:false }
]

class Drawer extends Component{
  clickHandler=()=>{
    this.props.onClose()
  }
  renderLinks (){
    return links.map((link,index)=>{
      return(
        <li key={index}>
          <NavLink
            to={link.to}
            exact={link.exact}
            activeClassName={classes.active}
            onClick={this.clickHandler}
          >
            {link.label}
          </NavLink>
        </li>
      )
    })
  }
  render(){
    const cls =[classes.Drawer]
    if(!this.props.isOpen){
      cls.push(classes.close)
    }
    return(
      <React.Fragment>
        <nav className={cls.join(' ')}>
         <ul>
           {this.renderLinks()}
         </ul>
        </nav>
        {this.props.isOpen?<BlackDrop onClick={this.props.onClose}/>:null}
        
      </React.Fragment>
  
      
    )
  }
}
export default Drawer;