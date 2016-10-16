import React, { Component } from 'react';

import TaskTab from './TaskTab';

export default class TaskTabs extends Component {
	
	render() {

		return(
			<div style={{display: 'flex'}} >
				<TaskTab label={'Process 1'} />
				<TaskTab label={'Process 2'} />
				<TaskTab label={'Process 3'} />
				<TaskTab label={'Process 4'} />
				<TaskTab label={'Process 5'} />
			</div>		
		);

	}
}