import React from 'react';
import Bpmn from './BPMN';

export default class CompensationMarker extends Bpmn {
	constructor(props) {
		super(props);

		this.state = {
			rawPath: {
		      d: 'm {mx},{my} 7,-5 0,10 z m 7.1,-0.3 6.9,-4.7 0,10 -6.9,-4.7 z',
		      height: 10,
		      width: 21,
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
          mx: ((this.props.width / 2 + (this.props.position ? this.props.position.compensation : 0)) / this.props.width),
          my: (this.props.height - 13) / this.props.height
        }
      });
		
		return(
			<Bpmn path={path} {...this.props} />
		);
	}
}