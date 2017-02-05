import React, { Component } from 'react';

import { Tabs, Tab } from 'react-bootstrap';

import processMocks from './../test/use_case/versao-0.1.0/process-mock';

export default class TaskTabs extends Component {
	
	render() {

		return(
			<Tabs defaultActiveKey={2} id="uncontrolled-tab-example">
				{processMocks.map( (k) =>
					<Tab key={k.id} title={k.name}>{this.props.children}</Tab>
				)}
			</Tabs>		
		);

	}
}