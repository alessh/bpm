import React, { Component } from 'react';
import Bpmn from './BPMN';
import Event from './Event';

export default class MultipleEvent extends Bpmn {
	constructor(props) {
		super(props);

		this.state = {
			rawPath: {
		      d:'m {mx},{my} {e.x1},-{e.y0} {e.x1},{e.y0} -{e.x0},{e.y1} -{e.x2},0 z',
		      height: 36,
		      width:  36,
		      heightElements: [6.28099, 12.56199],
		      widthElements: [3.1405, 9.42149, 12.56198]
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
          mx: 0.222,
          my: 0.36
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