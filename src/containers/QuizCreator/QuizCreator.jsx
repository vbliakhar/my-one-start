import React, { Component } from "react";
import classes from "./QuizCreator.module.css";
import Button from "../../components/UI/Button/Button";
import {
  createControl,
  validate,
  validateForm,
} from "../../form/formFramework";
import Input from "../../components/UI/Input/Input";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Select from "../../components/UI/Select/Select";
import axios from "axios";
//-----------------------Локальна спеціальна функція-------------------//
function createOptionControl(number) {
  return createControl(
    {
      label: `Version ${number}`,
      errorMessager: "The value can not be blank",
      id: number,
    },
    {
      required: true,
    }
  );
}
function createFormControls() {
  return {
    question: createControl(
      {
        label: "Enter a question",
        errorMessage: "The question can not be blank",
      },
      {
        required: true,
      }
    ),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4),
  };
}
class QuizCreator extends Component {
  //-------------------------State--------------------------------------//
  state = {
    quiz: [],
    isFormValid: false,
    rightAnswerId: 1,
    formControls: createFormControls(),
  };
  //------------------------Functions---------------------------------------//

  submitHandler = (event) => {
    event.preventDefault(); //обнуляєм стандартні  параметри форм
  };
  addQuestionHandler = (event) => {
    event.preventDefault();

    const quiz = this.state.quiz.concat();
    const index = quiz.length + 1;

    const {
      question,
      option1,
      option2,
      option3,
      option4,
    } = this.state.formControls;

    const questionItem = {
      question: question.value,
      id: index,
      rightAnswerId: this.state.rightAnswerId,
      answers: [
        { text: option1.value, id: option1.id },
        { text: option2.value, id: option2.id },
        { text: option3.value, id: option3.id },
        { text: option4.value, id: option4.id },
      ],
    };
    quiz.push(questionItem);

    this.setState({
      quiz,
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControls(),
    });
  };
  createQuizHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://react-quiz-29aa3.firebaseio.com/quizes.json",
        this.state.quiz
      );
      console.log(response.data);
      this.setState({
        quiz: [],
        isFormValid: false,
        rightAnswerId: 1,
        formControls: createFormControls(),
      });
    } catch (e) {
      console.log(e);
    }

    //TODO server
  };
  changeHandler = (value, controlName) => {
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };

    control.touched = true;
    control.value = value;
    control.valid = validate(control.value, control.validation);

    formControls[controlName] = control;

    this.setState({
      formControls,
      isFormValid: validateForm(formControls),
    });
  };

  renderControls() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];
      return (
        <Auxiliary key={controlName + index}>
          <Input
            label={control.label}
            value={control.value}
            valid={control.valid}
            shouldValidate={!!control.validation}
            touched={control.touched}
            errorMessage={control.errorMessage}
            onChange={(event) =>
              this.changeHandler(event.target.value, controlName)
            }
          />
          {index === 1 ? <hr /> : null}
        </Auxiliary>
      );
    });
  }

  selectChangehandler = (event) => {
    const a = +event.target.value;
    this.setState({
      rightAnswerId: a, // error search
    });
  };
  //-----------------------Render----------------------------------------//
  render() {
    const select = (
      <Select
        label="Choose the right answer here"
        value={this.state.rightAnswerId}
        onChange={this.selectChangehandler}
        options={[
          { text: 1, value: 1 },
          { text: 2, value: 2 },
          { text: 3, value: 3 },
          { text: 4, value: 4 },
        ]}
      />
    );
    return (
      <div className={classes.QuizCreator}>
        <div>
          <h1>Create Test</h1>
          <form onSubmit={this.submitHandler}>
            {this.renderControls()}

            {select}

            <Button
              type="primary"
              onClick={this.addQuestionHandler}
              disabled={!this.state.isFormValid}
            >
              add a question
            </Button>
            <Button
              type="success"
              onClick={this.createQuizHandler}
              disabled={this.state.quiz.length === 0}
            >
              Create a test
            </Button>
          </form>
        </div>
      </div>
    );
  }
}
export default QuizCreator;
