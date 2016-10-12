import React, { Component } from 'react';
import Bpmn from './BPMN';
import DataObject from './DataObject';

export default class DataObjectReference extends Bpmn {
	render() {

		return(
			<DataObject {...this.props} />
		);
	}
}