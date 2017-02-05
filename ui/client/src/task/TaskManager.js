import React, { Component } from 'react';

import TaskTabs from './TaskTabs';
import ProcessList from './ProcessList';
import ProcessPanel from './ProcessPanel';

import { Row, Col } from 'react-bootstrap';

export default class TaskManager extends Component {
	
	render() {
	    		
		return(
			<div>
				<Col md={2} >
					<ProcessList list={this.props.processes} />
				</Col>
				<Col md={10} >

						<TaskTabs />
						<ProcessPanel />

				</Col>
			</div>
		);
	}
}