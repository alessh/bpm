import React, { Component } from 'react';
import Bpmn from './BPMN';

import SubProcess from './SubProcess';

export default class Transaction extends Bpmn {
	render() {

		return(

		    <SubProcess {...this.props} />
		    
		);
	}
}