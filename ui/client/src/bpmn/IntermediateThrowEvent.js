import React from 'react';
import Bpmn from './BPMN';
import IntermediateEvent from './IntermediateEvent';

export default class IntermediateThrowEvent extends Bpmn {
	render() {

		return(

		    <IntermediateEvent {...this.props} />
		    
		);
	}
}