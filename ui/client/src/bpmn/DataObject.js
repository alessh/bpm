import React from 'react';
import Bpmn from './BPMN';

export default class DataObject extends Bpmn {
	constructor(props) {
		super(props);

		this.state = {
			rawPath: {
		      d:'m 0,0 {e.x1},0 {e.x0},{e.y0} 0,{e.y1} -{e.x2},0 0,-{e.y2} {e.x1},0 0,{e.y0} {e.x0},0',
		      height: 61,
		      width:  51,
		      heightElements: [10, 50, 60],
		      widthElements: [10, 40, 50, 60]
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
          mx: 0.474,
          my: 0.296
        }
      });

		var fill = this.props.isThrowing ? 'black' : 'none';

		var strokeWidth = 1;

		return(
			<Bpmn fill={fill} strokeWidth={strokeWidth} path={path} />
		);
	}
}