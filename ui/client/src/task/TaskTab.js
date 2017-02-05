import React, { Component } from 'react';

import { Tab } from 'react-bootstrap';

export default class TaskTab extends Component {
	
	render() {

		return(
			<Tab eventKey={1} title="Tab 1">{this.props.label}</Tab>
		);

	}
}