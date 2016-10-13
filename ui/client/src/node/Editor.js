import React, { Component } from 'react';

import Node from './Node';

export default class Editor extends Component {
	
	render() {
		const style = {
			body: {
				fontSize: '14px',
			    fontFamily: '\'Helvetica Neue\', Arial, Helvetica, sans-serif',
			}
		}

		return (
			<div style={style.body} >
				<svg width="100%" height="100%" pointerEvents="all" style={{cursor: 'crosshair', marginBotton: '0'}}>
					<Node />
				</svg>
			</div>
		);

	}
}