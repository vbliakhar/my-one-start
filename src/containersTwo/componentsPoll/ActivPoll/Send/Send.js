import React, {Component} from 'react'
import classes from './Send.module.css'


class Send extends Component{
 state = {
      truAnswer:2,
      cls:null,    // {[0] 'tru' else "false"}
      find: [
        {text:"myButtomOne", id:1},
        {text:"myButtomTwo", id:2},
        {text:"myButtomThree", id:3},
        {text:"myButtomFour", id:4},
    ]
 }
 could=(index)=>{

         if(this.state.truAnswer===this.state.find[index].id){
          console.log('true')

      }
      else{
        console.log('false')

      }

      const oldArray = this.state.find
      oldArray.text = "just"
      const newArray = [...this.state.find]
      newArray[index]=oldArray
      this.setState({
        find:newArray
      })
 }
 render(){
  
   return(
     
     <div className={classes.Send}>
      
        {this.state.find.map((textButtom,index)=>(
            <button
            key={index}
            onClick={()=>this.could(index)}
            > 
            {textButtom.text}
            </button>
        ))}
      
     </div>
   )
 }
}
export default Send;