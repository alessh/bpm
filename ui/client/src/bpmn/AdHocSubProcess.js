import React, { Component } from 'react';
import Bpmn from './BPMN';

import SubProcess from './SubProcess';

export default class AdHocSubProcess extends Bpmn {
	render() {

		return(

		    <SubProcess {...this.props} />
		    
		);
	}
}