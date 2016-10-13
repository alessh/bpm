import React from 'react';
import Bpmn from './BPMN';
import Event from './Event';

export default class TerminateEvent extends Bpmn {
	render() {

		let strokeWidth = this.props.strokeWidth || 4;

	    let cx = this.props.width / 2,
	        cy = this.props.height / 2;

		return(

			<Event strokeWidth={strokeWidth} {...this.props} >

				<circle 
		        	cx={cx} 
		        	cy={cy} 
		        	r={Math.round((this.props.width + this.props.height) / 4 - (this.props.offset || 0))} 
		        	stroke={this.props.stroke || '#ffffff'} 
		        	fill={this.props.fill || '#000000'} 
		        	style={{strokeWidth: 2}}
		        />

			</Event>

		);
	}
}
