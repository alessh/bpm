import React, { Component } from 'react';
import Bpmn from './BPMN';

export default class Gateway extends Bpmn {
	render() {

		let x_2 = this.props.width / 2;
	    let y_2 = this.props.height / 2;

	    let points = [x_2, 0, this.props.width, y_2, x_2, this.props.height, 0, y_2 ];

		return(

		    <g stroke={this.props.stroke || '#000000'} fill={this.props.fill || '#ffffff'} >
		        
		        <polygon 
		        	points={points} 
		        	stroke={this.props.stroke || '#000000'} 
		        	fill={this.props.fill || '#ffffff'} 
		        	strokeWidth={{strokeWidth: this.props.strokeWidth || 2}}
		        />

		        {this.props.children}

		    </g>

		);
	}
}