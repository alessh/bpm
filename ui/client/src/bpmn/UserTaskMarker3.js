import React from 'react';
import Bpmn from './BPMN';

export default class UserTaskMarker3 extends Bpmn {
	constructor(props) {
		super(props);

		this.state = {
			rawPath: {
		      d: 'm {mx},{my} m -6.9,-3.80 c 0,0 2.25099998,-2.358 4.27399998,-1.177 2.024,1.181 4.221,1.537 ' +
		        '4.124,0.965 -0.098,-0.57 -0.117,-3.79099999 -4.191,-4.13599999 -3.57499998,0.001 ' +
		        '-4.20799998,3.36699999 -4.20699998,4.34799999 z'
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