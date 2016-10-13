import React from 'react';
import Bpmn from './BPMN';
import Event from './Event';

export default class StartEvent extends Bpmn {
	render() {
		
		const strokeWidth = 1;

		return(

			<Event strokeWidth={strokeWidth} {...this.props} />

		);
	}
}