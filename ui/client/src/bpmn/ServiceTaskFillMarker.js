import React from 'react';
import Bpmn from './BPMN';

export default class ServiceTaskFillMarker extends Bpmn {
	constructor(props) {
		super(props);

		this.state = {
			rawPath: {
		      d: 'm {mx},{my} c -1.788948,0.7502 -3.8576,-0.0928 -4.6097055,-1.87438 -0.7521065,-1.78321 ' +
		        '0.090598,-3.84627 1.8802645,-4.59604 1.78823,-0.74936 3.856881,0.0929 4.608987,1.87437 ' +
		        '0.752106,1.78165 -0.0906,3.84612 -1.879546,4.59605 z'
		    }
		}
	}

	render() {

 		var path = this.getScaledPath(this.state.rawPath, {
        abspos: {
          x: 17.2,
          y: 18
        }
      });

		var strokeWidth = 1;

		return(
			<Bpmn strokeWidth={strokeWidth} path={path} />
		);
	}
}