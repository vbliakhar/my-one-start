import React, { Component } from "react";
import classes from "./Quiz.module.css";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import axios from "axios";
import Loader from "../../components/UI/Loader/Loader";

class Quiz extends Component {
  state = {
    results: {},
    isFinished: false,
    activeQuestion: 0,
    answerState: null, //{[id]: "success" "error"}
    loading: true,
    quiz: [
      // {
      //   question: "Яке твоє імя?",
      //   rightAnswerId: 1,
      //   id: 1,
      //   answers: [
      //     { text: "Сергій", id: 1 },
      //     { text: "Вася", id: 2 },
      //     { text: "Коля", id: 3 },
      //     { text: "Льоша", id: 4 },
      //     { text: "Петя", id: 5 },
      //   ],
      // },
      // {
      // 	question:"Скільки тобі років?",
      // 	rightAnswerId: 3,
      // 	id:2,
      // 	answers:[
      // 		{text: "24" ,id: 1},
      // 		{text: "29" ,id: 2},
      // 		{text: "31" ,id: 3},
      // 		{text: "38" ,id: 4},
      // 		{text: "45" ,id: 5},
      // 	]
      // },
      // {
      // 	question:"Де ти  працюєш?",
      // 	rightAnswerId: 3,
      // 	id:3,
      // 	answers:[
      // 		{text: "Запоріж сталь" ,id: 1},
      // 		{text: "Завод тесла" ,id: 2},
      // 		{text: "Шкода Авто" ,id: 3},
      // 		{text: "Безробітний" ,id: 4},
      // 	]
      // },
      // {
      // 	question:"Скільки років ти  ще будеш  працювати  на  заводі?",
      // 	rightAnswerId: 4,
      // 	id:4,
      // 	answers:[
      // 		{text: "1 рік" ,id: 1},
      // 		{text: "2 роки" ,id: 2},
      // 		{text: "5 років" ,id: 3},
      // 		{text: "10  років" ,id: 4},
      // 	]
      //   // },
    ],
  };
  onAnswerClickHandler = (answerId) => {
    console.log(`warning --  >>>${answerId}`);
    const question = this.state.quiz[this.state.activeQuestion];
    const results = this.state.results;
    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = "success";
      }
      this.setState({
        answerState: { [answerId]: "success" },
        results: results,
      });
      const timeout = window.setTimeout(() => {
        if (this.isQuizFinished()) {
          this.setState({
            isFinished: true,
          });
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null,
          });
        }
        window.clearTimeout(timeout);
      }, 1000);
    } else {
      console.log("error", answerId, "right:", question.rightAnswerId);
      results[question.id] = "error";
      this.setState({
        answerState: { [answerId]: "error" },
        results: results,
      });
    }
  };
  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length;
  }
  retryHandler = () => {
    this.setState({
      results: {},
      isFinished: false,
      activeQuestion: 0,
      answerState: null,
    });
  };
  async componentDidMount() {
    try {
      const response = await axios.get(
        `https://react-quiz-29aa3.firebaseio.com/quizes/${this.props.match.params.id}.json`
      );
      const quiz = response.data;

      this.setState({
        quiz,
        loading: false,
      });
    } catch (error) {
      console.log(error);
    }
    // console.log(this.props.match.params.id + "test-quiz");
  }
  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWraper}>
          <h1>Список тестів</h1>
          {this.state.loading ? (
            <Loader />
          ) : this.state.isFinished ? (
            <FinishedQuiz
              results={this.state.results}
              quiz={this.state.quiz}
              onRetry={this.retryHandler}
            />
          ) : (
            <ActiveQuiz
              answers={
                this.state.quiz[this.state.activeQuestion]
                  ? this.state.quiz[this.state.activeQuestion].answers
                  : []
              }
              question={
                this.state.quiz[this.state.activeQuestion]
                  ? this.state.quiz[this.state.activeQuestion].question
                  : []
              }
              onAnswerClick={this.onAnswerClickHandler}
              quizlength={this.state.quiz.length}
              answerNumber={this.state.activeQuestion + 1}
              state={this.state.answerState}
            />
          )}
        </div>
      </div>
    );
  }
}
export default Quiz;
