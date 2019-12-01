import React from 'react';
import Layout from "./hoc/Layout/Layout"
import Quiz from './containers/Quiz/Quiz'
import AcceptPavliv from './components/FinishedQuiz/AcceptPavliv'
// import Poll from './containersTwo/Poll/Poll'

function App() {
  return (
    <div>
      {/* <Poll/> */}
    <AcceptPavliv/>
    <Layout>
      <Quiz/>
    </Layout>
    
    </div>
  );
}

export default App;
