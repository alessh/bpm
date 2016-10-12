import React, { Component } from 'react';
import Bpmn from './BPMN';

export default class UserTaskMarker1 extends Bpmn {
	constructor(props) {
		super(props);

		this.state = {
			rawPath: {
		      d: 'm {mx},{my} c 0.909,-0.845 1.594,-2.049 1.594,-3.385 0,-2.554 -1.805,-4.62199999 ' +
		        '-4.357,-4.62199999 -2.55199998,0 -4.28799998,2.06799999 -4.28799998,4.62199999 0,1.348 ' +
		        '0.974,2.562 1.89599998,3.405 -0.52899998,0.187 -5.669,2.097 -5.794,4.7560005 v 6.718 ' +
		        'h 17 v -6.718 c 0,-2.2980005 -5.5279996,-4.5950005 -6.0509996,-4.7760005 z' +
		        'm -8,6 l 0,5.5 m 11,0 l 0,-5'
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