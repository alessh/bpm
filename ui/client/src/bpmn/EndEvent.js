import React from 'react';
import Bpmn from './BPMN';
import Event from './Event';

export default class EndEvent extends Bpmn {
	render() {
		
		const strokeWidth = 4;

		return(

			<Event strokeWidth={strokeWidth} {...this.props} />

		);
	}
}