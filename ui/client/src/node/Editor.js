import React, { Component } from 'react';

import Node from './Node';
import Wire from './Wire';

import uuid from 'node-uuid';

export default class Editor extends Component {
	
	render() {
		const style = {
			fontSize: '14px',
			height: '1000px',
		    fontFamily: '\'Helvetica Neue\', Arial, Helvetica, sans-serif',
		    cursor: 'crosshair',
		}

		let nodes = this.props.nodes.map( (node) => {
			node.w = 100;
			node.h = 30;

			return node;
		});

		const grid = {
			cell: {
				size: 20
			}
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
					<g>
						{nodes.map( (k, i) =>
							<Wire key={uuid.v4()} {...k} nodes={nodes} />
						)}

						{nodes.map( (k, i) =>
							<Node key={uuid.v4()} {...k} grid={grid} />
						)}
					</g>
				</svg>
			</div>
		);

	}
}