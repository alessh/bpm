import React, { Component } from 'react';
import Bpmn from './BPMN';

import Flow from './Flow';

export default class SequenceFlow extends Bpmn {
	render() {

		return(

		    <Flow {...this.props} >

		    	

		    </Flow>
		    
		);
	}
}