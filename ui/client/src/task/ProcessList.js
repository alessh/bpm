import React, { Component } from 'react';

import ProcessListItem from './ProcessListItem';

export default class ProcessList extends Component {
	
	render() {
		const processMocks = [
			{
				"id": "Process_1",
				"type": "bpmn:process",
				"name": "Processo simples (v0.1.0)",
				"description": "Este é um processo simples para testar a versao 0.1.0",
				"isExecutable": false,
				"width": 0,
				"height": 0,
				"x": 0,
				"y": 0
			},
			{
				"id": "Process_2",
				"type": "bpmn:process",
				"name": "Processo 2",
				"description": "Este é um processo simples para testar a versao 0.1.0",
				"isExecutable": false,
				"width": 0,
				"height": 0,
				"x": 0,
				"y": 0
			},
			{
				"id": "Process_3",
				"type": "bpmn:process",
				"name": "Processo 3",
				"description": "Este é um processo simples para testar a versao 0.1.0",
				"isExecutable": false,
				"width": 0,
				"height": 0,
				"x": 0,
				"y": 0
			},
			{
				"id": "Process_4",
				"type": "bpmn:process",
				"name": "Processo 4",
				"description": "Este é um processo simples para testar a versao 0.1.0",
				"isExecutable": false,
				"width": 0,
				"height": 0,
				"x": 0,
				"y": 0
			}
		]

		return(
			<div style={{borderWidth: 2, width: 100}} >
				<ul style={{
					    decoration: 'none'
					}}
				>

					{processMocks.map( (k) => 
						<ProcessListItem key={k.id} {...k} />
					)}

				</ul>
			</div>
		);

	}
}