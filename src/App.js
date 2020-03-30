import React from 'react';
import Layout from "./hoc/Layout/Layout"
import Quiz from './containers/Quiz/Quiz'
import {Route, Switch} from 'react-router-dom'
// import AcceptPavliv from './components/FinishedQuiz/AcceptPavliv'
import QuizList from './containers/QuizList/QuizList'
import Auth from './containers/Auth/Auth'
import QuizCreator from './containers/QuizCreator/QuizCreator'
function App() {
  return (
    <div>
    {/* <AcceptPavliv/> */}
    <Layout>
    {/* <Route path='/auth' exact component={Auth}></Route> //строге співпадіння path */}
      <Switch>
        <Route path='/auth' component={Auth}></Route>
        <Route path='/quiz-creator' component={QuizCreator}></Route>
        <Route path='/quiz/:id' component={Quiz}></Route>
        <Route path='/' component={QuizList}></Route>

      </Switch>
    </Layout>
    </div>
  );
}

export default App;
