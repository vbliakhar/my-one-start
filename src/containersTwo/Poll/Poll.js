import React, {Component} from 'react'
import classes from './Poll.module.css'
import ActivePoll from '../componentsPoll/ActivPoll/ActivePoll'
import Send from '../componentsPoll/ActivPoll/Send/Send'
class Poll extends Component {
  state ={
      activeQuestion:0,
      poll:[
        {
        question: "What is you name",
        rightAnswerId:3,
        answer:[
          {myText:"Nazar", id:1},
          {myText:"Petro", id:2},
          {myText:"Volodymyr", id:3},
          {myText:"Grysha", id:4},
        ]
        },
        {
          question: "How old are you",
          rightAnswerId:2,
          answer:[
            {myText:"10", id:1},
            {myText:"29", id:2},
            {myText:"50", id:3},
            {myText:"43", id:4},
          ]
        },
        {
            question: "where is you",
            rightAnswerId:3,
            answer:[
              {myText:"this", id:1},
              {myText:"that", id:2},
              {myText:"here", id:3},
              {myText:"not", id:4},
            ]
        },
          
      ]
  }

  answerClick =(index)=>{
    const rightAnswerId = this.state.poll[this.state.activeQuestion].rightAnswerId
   
      if (rightAnswerId === index){
        console.log(`Right ${index}`)
       if (this.state.activeQuestion+1!==this.state.poll.length){
       this.setState({
        activeQuestion:this.state.activeQuestion+1,
       })   
        }
       else {
         this.setState({
          activeQuestion:0,
         })
       }
        }
      else{
          console.log(`error try again`)
      }
 
  
    
  }
  render(){
    const answer=this.state.poll[this.state.activeQuestion].answer
    return(
      
      <div className={classes.Poll}>
       <Send/>
        <div className={classes.PollWraper}>
          <h1>Poll</h1>

          <ul>
            {answer.map((line, index)=>(
                 <li
                 key={index}
                 onClick={()=>this.answerClick(index)}
                 >
                  {line.myText}
                 </li>
            ))
            }
            </ul>
            <ActivePoll
              activeQuestion={this.state.activeQuestion+1}
              pollLength={this.state.poll.length}
              question={this.state.poll[this.state.activeQuestion].question}
              answer={this.state.poll[this.state.activeQuestion].answer}
              answerClick={this.answerClick}
            />
        </div>
      </div>
    )
  }
}
export default Poll;