import React, { Component } from "react";
import classes from "./Quiz.module.css";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
// import axios from "axios";
import Loader from "../../components/UI/Loader/Loader";

import { connect } from "react-redux";
import {fetchQuizById, quizAnswerClick, retryQuiz} from '../../store/actions/quiz'
class Quiz extends Component {
  // state = {
  //   // results: {},
  //   // isFinished: false,
  //   // activeQuestion: 0,
  //   // answerState: null, //{[id]: "success" "error"}
  //   // loading: true,
  //   // quiz: [  ],
  //   /**
  //    * перехід
  //    */
  //     // {
  //     //   question: "Яке твоє імя?",
  //     //   rightAnswerId: 1,
  //     //   id: 1,
  //     //   answers: [
  //     //     { text: "Сергій", id: 1 },
  //     //     { text: "Вася", id: 2 },
  //     //     { text: "Коля", id: 3 },
  //     //     { text: "Льоша", id: 4 },
  //     //     { text: "Петя", id: 5 },
  //     //   ],
  //     // },
  //     // {
  //     // 	question:"Скільки тобі років?",
  //     // 	rightAnswerId: 3,
  //     // 	id:2,
  //     // 	answers:[
  //     // 		{text: "24" ,id: 1},
  //     // 		{text: "29" ,id: 2},
  //     // 		{text: "31" ,id: 3},
  //     // 		{text: "38" ,id: 4},
  //     // 		{text: "45" ,id: 5},
  //     // 	]
  //     // },
  //     // {
  //     // 	question:"Де ти  працюєш?",
  //     // 	rightAnswerId: 3,
  //     // 	id:3,
  //     // 	answers:[
  //     // 		{text: "Запоріж сталь" ,id: 1},
  //     // 		{text: "Завод тесла" ,id: 2},
  //     // 		{text: "Шкода Авто" ,id: 3},
  //     // 		{text: "Безробітний" ,id: 4},
  //     // 	]
  //     // },
  //     // {
  //     // 	question:"Скільки років ти  ще будеш  працювати  на  заводі?",
  //     // 	rightAnswerId: 4,
  //     // 	id:4,
  //     // 	answers:[
  //     // 		{text: "1 рік" ,id: 1},
  //     // 		{text: "2 роки" ,id: 2},
  //     // 		{text: "5 років" ,id: 3},
  //     // 		{text: "10  років" ,id: 4},
  //     // 	]
  //     //   // },
  
  // };
  // onAnswerClickHandler = (answerId) => {
    // console.log(`warning --  >>>${answerId}`);
    // const question = this.state.quiz[this.state.activeQuestion];
    // const results = this.state.results;
    // if (question.rightAnswerId === answerId) {
    //   if (!results[question.id]) {
    //     results[question.id] = "success";
    //   }
    //   this.setState({
    //     answerState: { [answerId]: "success" },
    //     results: results,
    //   });
    //   const timeout = window.setTimeout(() => {
    //     if (this.isQuizFinished()) {
    //       this.setState({
    //         isFinished: true,
    //       });
    //     } else {
    //       this.setState({
    //         activeQuestion: this.state.activeQuestion + 1,
    //         answerState: null,
    //       });
    //     }
    //     window.clearTimeout(timeout);
    //   }, 1000);
    // } else {
    //   // console.log("error", answerId, "right:", question.rightAnswerId);
    //   results[question.id] = "error";
    //   this.setState({
    //     answerState: { [answerId]: "error" },
    //     results: results,
    //   });
    // }
  // };
  // isQuizFinished() {
  //   return this.props.activeQuestion + 1 === this.props.quiz.length;
  // }
  // retryHandler = () => {
  //   this.setState({
  //     results: {},
  //     isFinished: false,
  //     activeQuestion: 0,
  //     answerState: null,
  //   });
  // };
   componentDidMount() {
    console.log(this.props.match.params.id)
    this.props.fetchQuizById(this.props.match.params.id)
    // try {
    //   const response = await axios.get(
    //     `https://react-quiz-29aa3.firebaseio.com/quizes/${this.props.match.params.id}.json`
    //   );
    //   const quiz = response.data;
    //   this.setState({
    //     quiz,
    //     loading: false,
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
    // console.log(this.props.match.params.id + "test-quiz");
  }
  componentWillUnmount(){
    this.props.retryQuiz()
  }
  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWraper}>
          <h1>Список тестів</h1>
          
          {this.props.loading || !this.props.quiz ? (
            <Loader />
          ) : this.props.isFinished ? (
            <FinishedQuiz
              results={this.props.results}
              quiz={this.props.quiz}
              onRetry={this.props.retryQuiz}
            />
          ) : (
            <ActiveQuiz
              answers={
                this.props.quiz[this.props.activeQuestion]
                  ? this.props.quiz[this.props.activeQuestion].answers
                  : []
              }
              question={
                this.props.quiz[this.props.activeQuestion]
                  ? this.props.quiz[this.props.activeQuestion].question
                  : []
              }
              onAnswerClick={this.props.quizAnswerClick}
              quizlength={this.props.quiz.length}
              answerNumber={this.props.activeQuestion + 1}
              state={this.props.answerState}
            />
          )}
        </div>
      </div>
    );
  }
}
function mapStateToProps (state){
  return{
    results: state.quiz.results,
    isFinished: state.quiz.isFinished,
    activeQuestion: state.quiz.activeQuestion,
    answerState: state.quiz.answerState, //{[id]: "success" "error"}
    quiz: state.quiz.quiz,
    loading:state.quiz.loading,
  }
}
function mapDispatchToProps(dispatch){
  return{
    fetchQuizById:id=>dispatch(fetchQuizById(id)),
    quizAnswerClick:answerId=>dispatch(quizAnswerClick(answerId)),
    retryQuiz: () => dispatch(retryQuiz())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
