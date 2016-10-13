import React from 'react';
import Bpmn from './BPMN';

import SubProcess from './SubProcess';

export default class CallActivity extends Bpmn {
	render() {

		let strokeWidth = 5;
		
		return(

		    <SubProcess {...this.props} strokeWidth={strokeWidth} />
		    
		);
	}
}