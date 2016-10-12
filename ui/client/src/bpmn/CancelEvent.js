import React, { Component } from 'react';
import Bpmn from './BPMN';
import Event from './Event';

export default class CancelEvent extends Bpmn {
	constructor(props) {
		super(props);

		this.state = {
			rawPath: {
		      d: 'm {mx},{my} -{e.x1},0 0,{e.x0} {e.x1},0 0,{e.y1} {e.x0},0 ' +
		        '0,-{e.y1} {e.x1},0 0,-{e.y0} -{e.x1},0 0,-{e.y1} -{e.x0},0 z',
		      height: 36,
		      width: 36,
		      heightElements: [4.75, 8.5],
		      widthElements: [4.75, 8.5]
		    }
		}
	}

	render() {

 		var path = this.getScaledPath(this.state.rawPath, {
        xScaleFactor: 1.0,
        yScaleFactor: 1.0,
        containerWidth: this.props.width,
        containerHeight: this.props.height,
        position: {
          mx: 0.638,
          my: -0.055
        }
      });

		var fill = this.props.isThrowing ? 'black' : 'none';

		var strokeWidth = 1;

		return(
			<Event strokeWidth={strokeWidth} {...this.props} >
				<Bpmn fill={fill} strokeWidth={strokeWidth} path={path} /> {/*  style={{transform('rotate(45)'}} */}
			</Event>
		);
	}
}