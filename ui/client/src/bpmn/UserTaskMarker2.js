import React, { Component } from 'react';
import Bpmn from './BPMN';

export default class UserTaskMarker2 extends Bpmn {
	constructor(props) {
		super(props);

		this.state = {
			rawPath: {
		      d: 'm {mx},{my} m 2.162,1.009 c 0,2.4470005 -2.158,4.4310005 -4.821,4.4310005 ' +
		        '-2.66499998,0 -4.822,-1.981 -4.822,-4.4310005 '
		    }
		}
	}

	render() {
		var x = 15;
      	var y = 12;

 		var path = this.getScaledPath(this.state.rawPath, {
        abspos: {
          x: x,
          y: y
        }
      });

		var fill = this.props.isThrowing ? 'black' : 'white';
		var stroke = this.props.isThrowing ? 'white' : 'black';

		/*var messagePath = this.drawPath(p, pathData, {
			strokeWidth: 1,
			fill: fill,
			stroke: stroke
		})*/

		return(
			<Bpmn fill={fill} stroke={stroke} path={path} />
		);
	}
}