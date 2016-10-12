import React, { Component } from 'react';
import Bpmn from './BPMN';
import IntermediateEvent from './IntermediateEvent';

export default class IntermediateCatchEvent extends Bpmn {
	render() {

		return(

		    <IntermediateEvent {...this.props} />
		    
		);
	}
}