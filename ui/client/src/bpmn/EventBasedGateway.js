import React, { Component } from 'react';
import Bpmn from './BPMN';
import Gateway from './Gateway';
import Event from './Event';

export default class EventBasedGateway extends Bpmn {
	constructor(props) {
		super(props);

		this.state = {
			rawPath: {
		      d:'m {mx},{my} {e.x0},{e.y0} {e.x0},{e.y1} {e.x1},{e.y2} {e.x2},0 z',
		      height: 11,
		      width:  11,
		      heightElements: [-6, 6, 12, -12],
		      widthElements: [9, -3, -12]
		    }
		}
	}

	render() {

 		var path = this.getScaledPath(this.state.rawPath, {
          xScaleFactor: 0.18,
          yScaleFactor: 0.18,
          containerWidth: this.props.width,
          containerHeight: this.props.height,
          position: {
            mx: 0.36,
            my: 0.44
          }
        });

		var fill = this.props.isThrowing ? 'black' : 'none';

		var strokeWidth = 1;

		return(
			<Gateway strokeWidth={strokeWidth} {...this.props} >
				<Event strokeWidth={strokeWidth} {...this.props} offset={this.props.height * 0.25} >
					<Bpmn fill={fill} strokeWidth={strokeWidth} path={path} />
				</Event>
			</Gateway>
		);
	}
}