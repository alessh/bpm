import React from 'react';
import Bpmn from './BPMN';
import Event from './Event';

export default class SignalEvent extends Bpmn {
	constructor(props) {
		super(props);

		this.state = {
			rawPath: {
		      d: 'm {mx},{my} l {e.x0},{e.y0} l -{e.x1},0 Z',
		      height: 36,
		      width: 36,
		      heightElements: [18],
		      widthElements: [10, 20]
		    }
		}
	}

	render() {

 		var path = this.getScaledPath(this.state.rawPath, {
	        xScaleFactor: 0.9,
	        yScaleFactor: 0.9,
	        containerWidth: this.props.width,
	        containerHeight: this.props.height,
	        position: {
	          mx: 0.5,
	          my: 0.2
	        }
	      });

 		var strokeWidth = 1;

		var fill = this.props.isThrowing ? 'black' : 'none';

		return(
			<Event strokeWidth={strokeWidth} {...this.props} >
				<Bpmn fill={fill} path={path} strokeWidth={strokeWidth} {...this.props} />
			</Event>
		);
	}
}