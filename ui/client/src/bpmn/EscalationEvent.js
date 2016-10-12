import React, { Component } from 'react';
import Bpmn from './BPMN';
import Event from './Event';

export default class EscalationEvent extends Bpmn {
	constructor(props) {
		super(props);

		this.state = {
			rawPath: {
		      d: 'M {mx},{my} l {e.x0},{e.y0} l -{e.x0},-{e.y1} l -{e.x0},{e.y1} Z',
		      height: 36,
		      width: 36,
		      heightElements: [20, 7],
		      widthElements: [8]
		    }
		}
	}

	render() {

 		var path = this.getScaledPath(this.state.rawPath, {
        xScaleFactor: 1,
        yScaleFactor: 1,
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
				<Bpmn fill={fill} strokeWidth={strokeWidth} path={path} {...this.props} />
			</Event>
		);
	}
}