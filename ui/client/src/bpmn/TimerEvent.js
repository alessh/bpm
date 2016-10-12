import React, { Component } from 'react';
import Bpmn from './BPMN';
import Event from './Event';

export default class TimerEvent extends Bpmn {
	constructor(props) {
		super(props);

		this.state = {
			rawPath: {
		      d: 'M {mx},{my} l {e.x0},-{e.y0} m -{e.x0},{e.y0} l {e.x1},{e.y1} ',
		      height: 36,
		      width:  36,
		      heightElements: [10, 2],
		      widthElements: [3, 7]
		    }
		}
	}

	render() {

 		var path = this.getScaledPath(this.state.rawPath, {
        xScaleFactor: 0.75,
        yScaleFactor: 0.75,
        containerWidth: this.props.width,
        containerHeight: this.props.height,
        position: {
          mx: 0.5,
          my: 0.5
        }
      });

		var fill = this.props.isThrowing ? 'black' : 'none';

		var strokeWidth = 2;

		return(
			<Event strokeWidth={strokeWidth} {...this.props} >
				<Bpmn fill={fill} strokeWidth={strokeWidth} path={path} />
			</Event>
		);
	}
}