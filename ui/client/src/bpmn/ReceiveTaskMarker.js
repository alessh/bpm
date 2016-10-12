import React, { Component } from 'react';
import Bpmn from './BPMN';

export default class ReceiveTaskMarker extends Bpmn {
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
          xScaleFactor: 0.9,
          yScaleFactor: 0.9,
          containerWidth: 21,
          containerHeight: 14,
          position: {
            mx: 0.3,
            my: 0.4
          }
        });

		var fill = 'white';
		var stroke = 'black';
		var strokeWidth = 1

		return(
			<Bpmn fill={fill} stroke={stroke} strokeWidth={strokeWidth} path={path} />
		);
	}
}