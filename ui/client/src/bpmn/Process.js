import React, { Component } from 'react';
import Bpmn from './BPMN';

import Activity from './Activity';

export default class Process extends Bpmn {
	render() {

		return(

		    <Activity {...this.props} >

		    	

		    </Activity>
		    
		);
	}
}