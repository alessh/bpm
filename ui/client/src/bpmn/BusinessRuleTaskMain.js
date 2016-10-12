import React, { Component } from 'react';
import Bpmn from './BPMN';

export default class BusinessRuleTaskMain extends Bpmn {
	constructor(props) {
		super(props);

		this.state = {
			rawPath: {
		      d: 'm {mx},{my} 0,12 20,0 0,-12 z' +
		        'm 0,8 l 20,0 ' +
		        'm -13,-4 l 0,8'
		    }
		}
	}

	render() {

 		var path = this.getScaledPath(this.state.rawPath, {
        abspos: {
          x: 8,
          y: 8
        }
      });

		var fill = this.props.isThrowing ? 'black' : 'white';
		var stroke = this.props.isThrowing ? 'white' : 'black';
		
		return(
			<Bpmn fill={fill} stroke={stroke} path={path} />
		);
	}
}