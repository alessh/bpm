import React from 'react';
import Bpmn from './BPMN';
import Gateway from './Gateway';

export default class ParallelGateway extends Bpmn {
	constructor(props) {
		super(props);

		this.state = {
			rawPath: {
		      d:'m {mx},{my} 0,{e.y1} -{e.x1},0 0,{e.y0} {e.x1},0 0,{e.y1} {e.x0},0 ' +
		        '0,-{e.y1} {e.x1},0 0,-{e.y0} -{e.x1},0 0,-{e.y1} -{e.x0},0 z',
		      height: 30,
		      width:  30,
		      heightElements: [5, 12.5],
		      widthElements: [5, 12.5]
		    }
		}
	}

	render() {

 		var path = this.getScaledPath(this.state.rawPath, {
        xScaleFactor: 0.6,
        yScaleFactor:0.6,
        containerWidth: this.props.width,
        containerHeight: this.props.height,
        position: {
          mx: 0.46,
          my: 0.2
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