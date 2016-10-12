import React, { Component } from 'react';
import Bpmn from './BPMN';

export default class ParticipantMultiplicityMarker extends Bpmn {
	constructor(props) {
		super(props);

		this.state = {
			rawPath: {
		      d: 'm{mx},{my} m 3,2 l 0,10 m 3,-10 l 0,10 m 3,-10 l 0,10',
		      height: 10,
		      width: 10,
		      heightElements: [],
		      widthElements: []
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
          mx: ((this.props.width / 2) / this.props.width),
          my: (this.props.height - 15) / this.props.height
        }
      });
		
		return(
			<Bpmn path={path} {...this.props} />
		);
	}
}