import React, { Component } from 'react';

export default class TaskTab extends Component {
	
	render() {

		return(
			<li style={{
					padding: 10, 
					border: '1px solid transparent',
    				borderColor: '#aaa',
    				borderRadius: '5px 5px 0 0',
    				borderBottom: 'none',
				    bottom: '-1px',
				    position: 'relative',
				    listStyle: 'none',
				    padding: '6px 12px',
				    cursor: 'pointer',
				    position: 'relative',
				}} 
			>
				<span>{this.props.label}</span>
			</li>
		);

	}
}