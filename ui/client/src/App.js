import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Viewport from './bpmn/Viewport';

import NodeEditor from './node/Editor';

import myProcess from './test/use_case/diagram.json';
import myNodes from './test/use_case/node/ferias.json';

class App extends Component {

  render() {
    const style = {
      viewport: {
        background: 'lightgray',
        margin: '20px',
        height: '300px',
        overflow: 'auto',
      },
      nodeEditor: {
        background: 'white',
        margin: '20px',
        height: '300px',
        overflow: 'auto',
      }
    }
    return(
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>

        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      
        <Viewport style={style.viewport} diagram={myProcess} height={400} />

        <NodeEditor style={style.nodeEditor} nodes={myNodes} />

      </div>
    );
  }
}

export default App;
