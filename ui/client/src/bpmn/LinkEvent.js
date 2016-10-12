import React, { Component } from 'react';
import Bpmn from './BPMN';
import Event from './Event';

export default class LinkEvent extends Bpmn {
	constructor(props) {
		super(props);

		this.state = {
			rawPath: {
		      d: 'm {mx},{my} 0,{e.y0} -{e.x1},0 0,{e.y1} {e.x1},0 0,{e.y0} {e.x0},-{e.y2} -{e.x0},-{e.y2} z',
		      height: 36,
		      width: 36,
		      heightElements: [4.4375, 6.75, 7.8125],
		      widthElements: [9.84375, 13.5]
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
          mx: 0.57,
          my: 0.263
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