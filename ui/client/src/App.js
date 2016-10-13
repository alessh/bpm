import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Viewport from './bpmn/Viewport';

import myProcess from './test/use_case/diagram.json';

class App extends Component {

  render() {
    return(
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>

        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      
        <Viewport diagram={myProcess} height={800} />
      </div>
    );
  }
}

export default App;
