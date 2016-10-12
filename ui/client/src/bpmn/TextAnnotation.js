import React, { Component } from 'react';
import Bpmn from './BPMN';

export default class TextAnnotation extends Bpmn {
	constructor(props) {
		super(props);

		this.state = {
			rawPath: {
		      d: 'm {mx}, {my} m 10,0 l -10,0 l 0,{e.y0} l 10,0',
		      height: 30,
		      width: 10,
		      heightElements: [30],
		      widthElements: [10]
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
          mx: 0.0,
          my: 0.0
        }
      });

		var fill = 'none';
		var stroke = 'black';
		
		return(
			<Bpmn fill={fill} stroke={stroke} path={path} />
		);
	}
}