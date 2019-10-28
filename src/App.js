import React from 'react';
import Layout from "./hoc/Layout/Layout"
import Quiz from './containers/Quiz/Quiz'
// import Poll from './containersTwo/Poll/Poll'

function App() {
  return (
    <div>
      {/* <Poll/> */}
    <Layout>
      <Quiz/>
    </Layout>
    
    </div>
  );
}

export default App;
