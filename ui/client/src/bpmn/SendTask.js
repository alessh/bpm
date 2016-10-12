import React, { Component } from 'react';
import Bpmn from './BPMN';

import Task from './Task';
import SendTaskMarker from './SendTaskMarker';

export default class SendTask extends Bpmn {
	render() {

		return(

		    <Task {...this.props} >

		        <SendTaskMarker />
		        
		    </Task>
		    
		);
	}
}