import React, { Component } from 'react';
import Bpmn from './BPMN';

import Task from './Task';
import UserTaskMarker1 from './UserTaskMarker1';
import UserTaskMarker2 from './UserTaskMarker2';
import UserTaskMarker3 from './UserTaskMarker3';

export default class UserTask extends Bpmn {
	render() {

		return(

		    <Task {...this.props} >
		        <UserTaskMarker1 />
		        <UserTaskMarker2 />
		        <UserTaskMarker3 />
		    </Task>
		    
		);
	}
}