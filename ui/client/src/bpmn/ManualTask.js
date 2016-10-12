import React, { Component } from 'react';
import Bpmn from './BPMN';

import Task from './Task';
import ManualTaskMarker from './ManualTaskMarker'

export default class ManualTask extends Bpmn {
	render() {

		return(

		    <Task {...this.props} >
		        <ManualTaskMarker />
		    </Task>
		    
		);
	}
}