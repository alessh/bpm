import React from 'react';
import Bpmn from './BPMN';

import Task from './Task';
import ReceiveTaskMarker from './ReceiveTaskMarker';

export default class ReceiveTask extends Bpmn {
	render() {

		return(

		    <Task {...this.props} >
		        <ReceiveTaskMarker />
		    </Task>
		    
		);
	}
}