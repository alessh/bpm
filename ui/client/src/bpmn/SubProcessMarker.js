import React, { Component } from 'react';
import Bpmn from './BPMN';

export default class SubProcessMarker extends Bpmn {
	constructor(props) {
		super(props);

		this.state = {
			rawPath: {
		      d: 'm{mx},{my} m 7,2 l 0,10 m -5,-5 l 10,0',
		      height: 10,
		      width: 10,
		      heightElements: [],
		      widthElements: []
		    }
		}
	}

	render() {

 		var path = this.getScaledPath(this.state.rawPath, {
        xScaleFactor: 1.5,
        yScaleFactor: 1.5,
        containerWidth: this.props.width,
        containerHeight: this.props.height,
        position: {
          mx: (this.props.width / 2 - 7.5) / this.props.width,
          my: (this.props.height - 20) / this.props.height
        }
      });
		
		return(
			<Bpmn path={path} {...this.props} />
		);
	}
}