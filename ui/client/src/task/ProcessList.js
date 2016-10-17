import React, { Component } from 'react';

import ProcessListItem from './ProcessListItem';

import processMocks from './../test/use_case/versao-0.1.0/process-mock';

export default class ProcessList extends Component {
	
	render() {

		return(
			<div style={{borderWidth: 2, width: 100}} >
				<ul style={{
					    decoration: 'none'
					}}
				>

					{processMocks.map( (k) => 
						<ProcessListItem key={k.id} {...k} />
					)}

				</ul>
			</div>
		);

	}
}