import React from 'react';
import Bpmn from './BPMN';

export default class SequentialMarker extends Bpmn {
	constructor(props) {
		super(props);

		this.state = {
			rawPath: {
		      d: 'm{mx},{my} m 0,3 l 10,0 m -10,3 l 10,0 m -10,3 l 10,0',
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
          mx: ((this.props.width / 2 + (this.props.position ? this.props.position.seq : 0)) / this.props.width),
          my: (this.props.height - 19) / this.props.height
        }
      });
		
		return(
			<Bpmn path={path} {...this.props} />
		);
	}
}