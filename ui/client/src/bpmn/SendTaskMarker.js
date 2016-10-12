import React, { Component } from 'react';
import Bpmn from './BPMN';

export default class SendTaskMarker extends Bpmn {
	constructor(props) {
		super(props);

		this.state = {
			rawPath: {
		      d: 'm {mx},{my} l 0,{e.y1} l {e.x1},0 l 0,-{e.y1} z l {e.x0},{e.y0} l {e.x0},-{e.y0}',
		      height: 14,
		      width:  21,
		      heightElements: [6, 14],
		      widthElements: [10.5, 21]
		    }
		}
	}

	render() {

 		var path = this.getScaledPath(this.state.rawPath, {
        xScaleFactor: 1,
        yScaleFactor: 1,
        containerWidth: 21,
        containerHeight: 14,
        position: {
          mx: 0.285,
          my: 0.357
        }
      });

		var fill = 'black';
		var stroke = 'white';
		var strokeWidth = 1

		return(
			<Bpmn fill={fill} stroke={stroke} strokeWidth={strokeWidth} path={path} />
		);
	}
}