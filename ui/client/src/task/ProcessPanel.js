import React, { Component } from 'react';

import Viewport from './../bpmn/Viewport';
import NodeEditor from './../node/Editor';

import processUseCase from './../test/use_case/versao-0.1.0/process.json';
import executionUseCase from './../test/use_case/versao-0.1.0/execution.json';

export default class ProcessPanel extends Component {
	
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
	    
		return (
			<div>
				<h1>Process 1</h1>

				<Viewport style={style.viewport} diagram={processUseCase} height={400} />

	        	<NodeEditor style={style.nodeEditor} nodes={executionUseCase} />

			</div>
		);

	}
}