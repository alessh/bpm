import React, { Component } from 'react';

import TaskTab from './TaskTab';

import processMocks from './../test/use_case/versao-0.1.0/process-mock';

export default class TaskTabs extends Component {
	
	render() {

		return(
			<ul style={{
					display: 'flex',
				    borderBottom: '1px solid #aaa',
				    margin: '0 0 10px',
				    padding: 0,
				    listStyle: 'none',
				}} 

			>
				{processMocks.map( (k) =>
					<TaskTab key={k.id} label={k.name} />
				)}
				
			</ul>		
		);

	}
}