import React, {Component} from 'react'
import classes from './Drawer.module.css'
import BlackDrop from '../../UI/BlakDrop/BlackDrop'
const links = [
  1,2,3
]

class Drawer extends Component{
  renderLinks (){
    return links.map((link,index)=>{
      return(
        <li key={index}>
          <a href=" ">link {link}</a>
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