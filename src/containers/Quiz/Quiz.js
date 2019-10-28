import React, {Component} from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz"
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz"

class Quiz extends Component{
    state= {
				isFinished:true,
				activeQuestion:0,
				answerState:null, //{[id]: "success" "error"}
        quiz:[
					{
						question:"Where you work?",
						rightAnswerId: 2,
						id:1,
						answers:[
							{text: "programing" ,id: 1},
							{text: "operator vuroby" ,id: 2},
							{text: "igenier" ,id: 3},
							{text: "doctor" ,id: 4},
							{text: "teacher" ,id: 5},
						]
					},
					{
						question:"What is your dream?",
						rightAnswerId: 1,
						id:2,
						answers:[
							{text: "Children" ,id: 1},
							{text: "house" ,id: 2},
							{text: "work - programming" ,id: 3},
							{text: "i dont no" ,id: 4},
							{text: "rest" ,id: 5},
						]
					},
					],
					test:"test"
        
		}
		onAnswerClickHandler = (answerId)=>{
			console.log(`warning --  >>>${answerId}`)
				const question = this.state.quiz[this.state.activeQuestion]
				if (question.rightAnswerId===answerId){
						this.setState({
							answerState:{[answerId]:"success"}
						})
					const timeout = window.setTimeout(()=>{
						if (this.isQuizFinished()){

								this.setState({
									isFinished:true
								})
						}else{
							this.setState({
								activeQuestion:this.state.activeQuestion+1,
								answerState:null
							})
						}
						window.clearTimeout(timeout)
					},1000)

						
				}else{
					console.log("error", answerId, "right:",  question.rightAnswerId)
					this.setState({
						answerState:{[answerId]:"error"}
					})
				}
				
		}
		isQuizFinished(){
			return this.state.activeQuestion + 1 === this.state.quiz.length
		}

		
    render(){
        return(
            <div className={classes.Quiz}>
                
                <div className={classes.QuizWraper}>
                     <h1>Quiz</h1>
										 {this.state.isFinished?
										 <FinishedQuiz/>:
                    <ActiveQuiz
											answers={this.state.quiz[this.state.activeQuestion].answers}
											question={this.state.quiz[this.state.activeQuestion].question}
											onAnswerClick={this.onAnswerClickHandler}
											quizlength={this.state.quiz.length}
											answerNumber={this.state.activeQuestion+1}
											state={this.state.answerState}
								
                    />}
                </div>
                
            </div>
        )
    }
}
export default Quiz;