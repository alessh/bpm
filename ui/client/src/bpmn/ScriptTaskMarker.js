import React from 'react';
import Bpmn from './BPMN';

export default class ScriptTaskMarker extends Bpmn {
	constructor(props) {
		super(props);

		this.state = {
			rawPath: {
		      d: 'm {mx},{my} c 9.966553,-6.27276 -8.000926,-7.91932 2.968968,-14.938 l -8.802728,0 ' +
		        'c -10.969894,7.01868 6.997585,8.66524 -2.968967,14.938 z ' +
		        'm -7,-12 l 5,0 ' +
		        'm -4.5,3 l 4.5,0 ' +
		        'm -3,3 l 5,0' +
		        'm -4,3 l 5,0',
		      height: 15,
		      width:  12.6,
		      heightElements: [6, 14],
		      widthElements: [10.5, 21]
		    }
		}
	}

	render() {

 		var path = this.getScaledPath(this.state.rawPath, {
        abspos: {
          x: 15,
          y: 20
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