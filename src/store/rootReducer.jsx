import { combineReducers } from "redux";
import quizReducers from "./reducers/quiz";
export default combineReducers({ quiz: quizReducers });
