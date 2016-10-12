import React, { Component } from 'react';
import Bpmn from './BPMN';
import Event from './Event'
import Gateway from './Gateway';

export default class InclusiveGateway extends Bpmn {
	render() {

		let strokeWidth = 2.5;

		return(

		    <Gateway {...this.props} >
		    	<Event  {...this.props} strokeWidth={strokeWidth} />
		    </Gateway>
		    
		);
	}
}