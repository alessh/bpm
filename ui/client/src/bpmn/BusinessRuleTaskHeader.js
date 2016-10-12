import React, { Component } from 'react';
import Bpmn from './BPMN';

export default class BusinessRuleTaskHeader extends Bpmn {
	constructor(props) {
		super(props);

		this.state = {
			rawPath: {
		      d: 'm {mx},{my} 0,4 20,0 0,-4 z'
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