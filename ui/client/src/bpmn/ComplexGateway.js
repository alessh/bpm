import React from 'react';
import Bpmn from './BPMN';
import Gateway from './Gateway';

export default class ComplexGateway extends Bpmn {
	constructor(props) {
		super(props);

		this.state = {
			rawPath: {
		      d:'m {mx},{my} 0,{e.y0} -{e.x0},-{e.y1} -{e.x1},{e.y2} {e.x0},{e.y1} -{e.x2},0 0,{e.y3} ' +
		        '{e.x2},0  -{e.x0},{e.y1} l {e.x1},{e.y2} {e.x0},-{e.y1} 0,{e.y0} {e.x3},0 0,-{e.y0} {e.x0},{e.y1} ' +
		        '{e.x1},-{e.y2} -{e.x0},-{e.y1} {e.x2},0 0,-{e.y3} -{e.x2},0 {e.x0},-{e.y1} -{e.x1},-{e.y2} ' +
		        '-{e.x0},{e.y1} 0,-{e.y0} -{e.x3},0 z',
		      height: 17.125,
		      width:  17.125,
		      heightElements: [4.875, 3.4375, 2.125, 3],
		      widthElements: [3.4375, 2.125, 4.875, 3]
		    }
		}
	}

	render() {

 		var path = this.getScaledPath(this.state.rawPath, {
        xScaleFactor: 0.5,
        yScaleFactor:0.5,
        containerWidth: this.props.width,
        containerHeight: this.props.height,
        position: {
          mx: 0.46,
          my: 0.26
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