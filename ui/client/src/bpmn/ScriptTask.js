import React, { Component } from 'react';
import Bpmn from './BPMN';

import Task from './Task';
import ScriptTaskMarker from './ScriptTaskMarker';

export default class ScriptTask extends Bpmn {
	render() {

		return(

		    <Task {...this.props} >
		        
		        <ScriptTaskMarker />
		    
		    </Task>
		    
		);
	}
}