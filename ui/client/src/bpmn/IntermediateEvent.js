import React from 'react';
import Bpmn from './BPMN';
import Event from './Event';

export default class IntermediateEvent extends Bpmn {
	render() {

		let strokeWidth = this.props.strokeWidth || 1;

	    let cx = this.props.width / 2,
	        cy = this.props.height / 2;

		return(

			<Event strokeWidth={strokeWidth} {...this.props} >

				<circle 
		        	cx={cx} 
		        	cy={cy} 
		        	r={Math.round((this.props.width + this.props.height) / 4 - (this.props.offset || 0))} 
		        	stroke={this.props.stroke || '#000000'} 
		        	fill={this.props.fill || '#ffffff'} 
		        	style={{strokeWidth: 4}}
		        />

			</Event>

		);
	}
}
