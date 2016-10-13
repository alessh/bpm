import React from 'react';
import Bpmn from './BPMN';

export default class DataStoreReference extends Bpmn {
	constructor(props) {
		super(props);

		this.state = {
			rawPath: {
		      d:'m  {mx},{my} ' +
		        'l  0,{e.y2} ' +
		        'c  {e.x0},{e.y1} {e.x1},{e.y1}  {e.x2},0 ' +
		        'l  0,-{e.y2} ' +
		        'c -{e.x0},-{e.y1} -{e.x1},-{e.y1} -{e.x2},0' +
		        'c  {e.x0},{e.y1} {e.x1},{e.y1}  {e.x2},0 ' +
		        'm  -{e.x2},{e.y0}' +
		        'c  {e.x0},{e.y1} {e.x1},{e.y1} {e.x2},0' +
		        'm  -{e.x2},{e.y0}' +
		        'c  {e.x0},{e.y1} {e.x1},{e.y1}  {e.x2},0',
		      height: 61,
		      width:  61,
		      heightElements: [7, 10, 45],
		      widthElements:  [2, 58, 60]
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
          mx: 0,
          my: 0.133
        }
      });

		var fill = 'white';

		var strokeWidth = 2;

		return(
			<Bpmn fill={fill} strokeWidth={strokeWidth} path={path} />
		);
	}
}