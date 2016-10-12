import React, { Component } from 'react';
import Bpmn from './BPMN';
import Event from './Event';

export default class MessageEvent extends Bpmn {
	constructor(props) {
		super(props);

		this.state = {
			rawPath: {
				d: 'm {mx},{my} l 0,{e.y1} l {e.x1},0 l 0,-{e.y1} z l {e.x0},{e.y0} l {e.x0},-{e.y0}',
				height: 36,
				width:  36,
				heightElements: [6, 14],
				widthElements: [10.5, 21]
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
			  	mx: 0.235,
          		my: 0.315
			}
		});

		var strokeWidth = 1

		var fill = this.props.isThrowing ? 'black' : 'white';
		var stroke = this.props.isThrowing ? 'white' : 'black';

		return(
			<Event fill={fill} stroke={stroke} {...this.props} >
				{/*<Bpmn fill={fill} stroke={stroke} path={path} strokeWidth={strokeWidth} {...this.props} />*/}
				<path d={path} stroke={stroke} path={path} strokeWidth={strokeWidth} />
			</Event>
		);
	}
}