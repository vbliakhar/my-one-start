import React from 'react';
import Layout from "./hoc/Layout/Layout"
import Quiz from './containers/Quiz/Quiz'
// import AcceptPavliv from './components/FinishedQuiz/AcceptPavliv'


function App() {
  return (
    <div>
    {/* <AcceptPavliv/> */}
    <Layout>
      <Quiz/>
    </Layout>
    </div>
  );
}

export default App;
