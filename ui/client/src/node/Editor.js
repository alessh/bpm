import React, { Component } from 'react';

import Node from './Node';

export default class Editor extends Component {
	
	render() {
		const style = {
			fontSize: '14px',
		    fontFamily: '\'Helvetica Neue\', Arial, Helvetica, sans-serif',
		    cursor: 'crosshair',
		}

		return (
			<div 
				style={this.props.style} 
			>
				<svg 
					width="100%" 
					height="100%" 
					pointerEvents="all" 
					style={style}
				>
					
					<Node />

				</svg>
			</div>
		);

	}
}