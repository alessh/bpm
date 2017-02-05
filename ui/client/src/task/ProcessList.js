import React, { Component } from 'react';

import { ListGroup, ListGroupItem } from 'react-bootstrap';

import processMocks from './../test/use_case/versao-0.1.0/process-mock';

export default class ProcessList extends Component {
	
	render() {

		return(
			<ListGroup>
				{processMocks.map( (process) => 
					<ListGroupItem key={process.id} header={process.name}></ListGroupItem>
				)}
			</ListGroup>
		);

	}
}