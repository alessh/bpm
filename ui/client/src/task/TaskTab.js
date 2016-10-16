import React, { Component } from 'react';

export default class TaskTab extends Component {
	
	render() {

		return(
			<div style={{padding: 10, borderTop: 1, borderLeft: 1, borderRight: 1,borderSize: 2}} >
				<span>{this.props.label}</span>
			</div>
		);

	}
}