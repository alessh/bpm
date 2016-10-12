import React, { Component } from 'react';
import Bpmn from './BPMN';
import Event from './Event';

export default class ErrorEvent extends Bpmn {
	constructor(props) {
		super(props);

		this.state = {
			rawPath: {
		      d: 'm {mx},{my} {e.x0},-{e.y0} {e.x1},-{e.y1} {e.x2},{e.y2} {e.x3},-{e.y3} -{e.x4},{e.y4} -{e.x5},-{e.y5} z',
		      height: 36,
		      width: 36,
		      heightElements: [0.023, 8.737, 8.151, 16.564, 10.591, 8.714],
		      widthElements: [0.085, 6.672, 6.97, 4.273, 5.337, 6.636]
		    }
		}
	}

	render() {

 		var path = this.getScaledPath(this.state.rawPath, {
        xScaleFactor: 1.1,
        yScaleFactor: 1.1,
        containerWidth: this.props.width,
        containerHeight: this.props.height,
        position: {
          mx: 0.2,
          my: 0.722
        }
      });

		var fill = this.props.isThrowing ? 'black' : 'none';

		var strokeWidth = 1;

		return(
			<Event strokeWidth={strokeWidth} {...this.props} >
				<Bpmn fill={fill} strokeWidth={strokeWidth} path={path} />
			</Event>
		);
	}
}