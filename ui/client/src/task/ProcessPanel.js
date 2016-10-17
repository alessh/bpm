import React, { Component } from 'react';

import Viewport from './../bpmn/Viewport';
import NodeEditor from './../node/Editor';

import processUseCase from './../test/use_case/versao-0.1.0/process.json';
import executionUseCase from './../test/use_case/versao-0.1.0/execution.json';

export default class ProcessPanel extends Component {
	constructor(props) {
		super(props);

		this.onClick = this.onClick.bind(this);
	}

	onClick(p) {
		alert('Inicia o processo: ' + p.name)
	}

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

	    const process = processUseCase.find( (k) => k.type === 'bpmn:process');

		return (
			<div>
				<div style={{display: 'flex',textAlign: 'left'}} > 

					<div style={{width: '100%', display: 'block', }} >
						<h1 style={{margin: 20}} >{process.name}</h1>
						<span style={{margin: 20, fontSize: '1.5em'}} >{process.description}</span>
					</div>

					<input 
						type="button" 
						value="iniciar" 
						style={{
							height: 80,
							width: 80, 
							right: 0, 
							border: 1, 
							borderRadius: '50%',
							margin: 20
						}} 
						onClick={this.onClick.bind(this, process)}
					/>
				</div>

				

				<Viewport style={style.viewport} diagram={processUseCase} height={400} />

	        	<NodeEditor style={style.nodeEditor} nodes={executionUseCase} />

			</div>
		);

	}
}