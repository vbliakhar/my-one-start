import React, {Component} from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz"
class Quiz extends Component{
    state= {
				activeQuestion:0,
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
				console.log("answerId:", answerId)
				const question = this.state.quiz[this.state.activeQuestion]
				if (question.rightAnswerId===answerId){
						console.log("right", question.rightAnswerId)
						this.setState({
							activeQuestion:this.state.activeQuestion+1
						})
				}else{
					console.log("error", answerId, "right:",  question.rightAnswerId)
				}
				
		}
    render(){
        
        return(
            <div className={classes.Quiz}>
                
                <div className={classes.QuizWraper}>
                     <h1>Quiz</h1>
                    <ActiveQuiz
											answers={this.state.quiz[this.state.activeQuestion].answers}
											question={this.state.quiz[this.state.activeQuestion].question}
											onAnswerClick={this.onAnswerClickHandler}
											quizlength={this.state.quiz.length}
											answerNumber={this.state.activeQuestion+1}
                    />
                </div>
                
            </div>
        )
    }
}
export default Quiz;