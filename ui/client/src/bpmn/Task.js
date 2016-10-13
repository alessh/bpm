import React from 'react';
import Bpmn from './BPMN';

import Activity from './Activity';


export default class Task extends Bpmn {


	render() {

		return(

	    	<Activity {...this.props} />
		    
		);
	}
}