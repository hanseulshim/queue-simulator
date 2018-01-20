import React, { Component } from 'react';
import Header from './Header';
import JobContainer from './JobContainer';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <JobContainer />
      </div>
    );
  }
}

export default App;
