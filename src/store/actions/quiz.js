import axios from "axios";
import {
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  FETCH_QUIZES_ERROR,
  FETCH_QUIZ_SUCCESS,
  QUIZ_SET_STATE,
  FINISH_QUIZ,
  QUIZ_NEXT_QUESTION,
  QUIZ_RETRY
} from "./actionType";

export function fetchQuizes() {
  return async (dispatch) => {
    dispatch(fetchQuizesStart());
    try {
      const response = await axios.get(
        "https://react-quiz-29aa3.firebaseio.com/quizes.json"
      );
      // console.log(response.data);
      const quizes = []
      Object.keys(response.data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `Test ${index + 1}`,
        });
      });
      dispatch(fetchQuizesSuccess(quizes));
      // this.setState({
      //   quizes,
      //   loading: false,
      // });
    } catch (error) {
      dispatch(fetchQuizesError(error));
      // console.log(error);
    }
  }
};
export function fetchQuizById(quizId) {
  return async (dispatch) => {
    dispatch(fetchQuizesStart())
    console.log("test")
    try {
      const response = await axios.get(
        `https://react-quiz-29aa3.firebaseio.com/quizes/${quizId}.json`
      );
      const quiz = response.data;

      dispatch(fetchQuizSuccess(quiz))
    } catch (error) {
      console.log(error);
      dispatch(fetchQuizesError(error))
    }
  }
}
export function fetchQuizSuccess (quiz){
  return{
    type: FETCH_QUIZ_SUCCESS,
    quiz 
  }
}
export function fetchQuizesStart() {
  return {
    type: FETCH_QUIZES_START,
  };
}
export function fetchQuizesSuccess(quizes) {
  return {
    type: FETCH_QUIZES_SUCCESS,
    quizes: quizes,
  };
}
export function fetchQuizesError(error) {
  return {
    type: FETCH_QUIZES_ERROR,
    error: error,
  };
}

export function quizSetState (answerState, results){
  return {
    type:QUIZ_SET_STATE,
    answerState,results
  }
}
export function finishQuiz (){
  return{
    type:FINISH_QUIZ,
  }
}
export function quizNextQuestion (number){
  return{
    type: QUIZ_NEXT_QUESTION,
    number
  }
}
export function retryQuiz(){
  return{
    type:QUIZ_RETRY
  }
}
export function quizAnswerClick(answerId) {
  return (dispatch, getState) =>{

    const state = getState().quiz


    // if (state.answerState) {
    //   const key = Object.keys(state.answerState)[0]
    //   if (state.answerState[key] === 'success') {
    //     return
    //   }
    // }


    const question = state.quiz[state.activeQuestion];
    const results = state.results;
    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = "success";
      }

      dispatch(quizSetState({[answerId]: 'success'}, results))
      // this.setState({
      //   answerState: { [answerId]: "success" },
      //   results: results,
      // });
      const timeout = window.setTimeout(() => {
        if (isQuizFinished(state)) {
          dispatch (finishQuiz())
          // this.setState({
          //   isFinished: true,
          // });
        } else {
          dispatch (quizNextQuestion(state.activeQuestion + 1))
          // this.setState({
          //   activeQuestion: this.state.activeQuestion + 1,
          //   answerState: null,
          // });
        }
        window.clearTimeout(timeout);
      }, 1000);
    } else {
      // console.log("error", answerId, "right:", question.rightAnswerId);
      results[question.id] = "error";
      dispatch(quizSetState({[answerId]: 'error'}, results))
      // this.setState({
      //   answerState: { [answerId]: "error" },
      //   results: results,
      // });
    }
  }
}
function isQuizFinished (state){
  return state.activeQuestion+1 === state.quiz.length
}