import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Viewport from './bpmn/Viewport';

import myProcess from './test/use_case/diagram.json';

class App extends Component {

  render() {
    return(
      <Viewport diagram={myProcess} height={800} />
    );
  }
}

export default App;
