import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Row, Col } from 'react-bootstrap';

import TaskManager from './task/TaskManager';
import Monitor from './admin/Monitor';
  
class App extends Component {

  render() {

    return(
      <div className="App">
        <div className="App-header">
        </div>

          <Col md={10}>        
            <TaskManager />
          </Col>
          <Col md={2}>
            <Monitor />
          </Col> 

      </div>
    );
  }
}

export default App;
