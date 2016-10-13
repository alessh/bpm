import React from 'react';
import Bpmn from './BPMN';

export default class LoopMarker extends Bpmn {
	constructor(props) {
		super(props);

		this.state = {
			rawPath: {
		      d: 'm {mx},{my} c 3.526979,0 6.386161,-2.829858 6.386161,-6.320661 0,-3.490806 -2.859182,-6.320661 ' +
		        '-6.386161,-6.320661 -3.526978,0 -6.38616,2.829855 -6.38616,6.320661 0,1.745402 ' +
		        '0.714797,3.325567 1.870463,4.469381 0.577834,0.571908 1.265885,1.034728 2.029916,1.35457 ' +
		        'l -0.718163,-3.909793 m 0.718163,3.909793 -3.885211,0.802902',
		      height: 13.9,
		      width: 13.7,
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
          mx: ((this.props.width / 2 + (this.props.position ? this.props.position.loop : 0 )) / this.props.width),
          my: (this.props.height - 7) / this.props.height
        }
      });
		
		let strokeWidth = 1;
        let fill = 'none';
        let strokeLinecap = 'round';
        let strokeMiterlimit = 0.5;

		return(
			<Bpmn fill={fill} strokeWidth={strokeWidth} strokeLinecap={strokeLinecap} strokeMiterlimit={strokeMiterlimit} path={path} />
		);
	}
}