import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./QuizList.module.css";
import Loader from "../../components/UI/Loader/Loader";

import { connect } from "react-redux";
import { fetchQuizes } from "../../store/actions/quiz";
class QuizList extends React.Component {
  // state = {
  //   quizes: [],
  //   loading: true,
  // };

  renderQuizes() {
    return this.props.quizes.map((quiz) => {
      return (
        <li key={quiz.id}>
          <NavLink to={"/quiz/" + quiz.id}>{quiz.name}</NavLink>
        </li>
      );
    });
  }

  componentDidMount() {
    this.props.fetchQuizes();

    // this.props.fetchQuizes();
    // try {
    //   const response = await axios.get(
    //     "https://react-quiz-29aa3.firebaseio.com/quizes.json"
    //   );
    //   // console.log(response.data);
    //   const quizes = [];
    //   Object.keys(response.data).forEach((key, index) => {
    //     quizes.push({
    //       id: key,
    //       name: `Test ${index + 1}`,
    //     });
    //   });
    //   this.setState({
    //     quizes,
    //     loading: false,
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
  }
  render() {
    return (
      <div className={classes.QuizList}>
        <div>
          <h1>QuizList</h1>
          {this.props.loading && this.props.quizes.length !== 0 ? (
            <Loader />
          ) : (
            <ul>{this.renderQuizes()}</ul>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    quizes: state.quiz.quizes,
    loading: state.quiz.loading,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    fetchQuizes: () => dispatch(fetchQuizes()),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(QuizList);
