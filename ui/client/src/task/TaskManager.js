import React, { Component } from 'react';

import TaskTabs from './TaskTabs';
import ProcessList from './ProcessList';
import ProcessPanel from './ProcessPanel';
import TaskList from './TaskList';
import TaskPanel from './TaskPanel';

export default class TaskManager extends Component {
	
	render() {
	    		
		return(

			<div style={{display: 'flex'}} > 
				<div style={{width: '15%'}} >
					<ProcessList list={this.props.processes} />
				</div>

				<div style={{width: '85%'}}>

					<div style={{height: '40px'}} >
						<TaskTabs />
					</div>

					<div style={{top: '40px'}} >

						<ProcessPanel />

	        		</div>
	        	</div>
        	</div>
		);
	}
}