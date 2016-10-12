import React, { Component } from 'react';
import Bpmn from './BPMN';
import Gateway from './Gateway';

export default class ExclusiveGateway extends Bpmn {
	constructor(props) {
		super(props);

		this.state = {
			rawPath: {
		      d:'m {mx},{my} {e.x0},{e.y0} {e.x1},{e.y0} {e.x2},0 {e.x4},{e.y2} ' +
		                    '{e.x4},{e.y1} {e.x2},0 {e.x1},{e.y3} {e.x0},{e.y3} ' +
		                    '{e.x3},0 {e.x5},{e.y1} {e.x5},{e.y2} {e.x3},0 z',
		      height: 17.5,
		      width:  17.5,
		      heightElements: [8.5, 6.5312, -6.5312, -8.5],
		      widthElements:  [6.5, -6.5, 3, -3, 5, -5]
		    }
		}
	}

	render() {

 		var path = this.getScaledPath(this.state.rawPath, {
        xScaleFactor: 0.4,
        yScaleFactor: 0.4,
        containerWidth: this.props.width,
        containerHeight: this.props.height,
        position: {
          mx: 0.32,
          my: 0.3
        }
      });

		var fill = this.props.isThrowing ? 'black' : 'none';

		var strokeWidth = 1;

		return(
			<Gateway strokeWidth={strokeWidth} {...this.props} >
				<Bpmn fill={fill} strokeWidth={strokeWidth} path={path} />
			</Gateway>
		);
	}
}