import React, { Component } from 'react';

import uuid from 'node-uuid';

export default class Wire extends Component {
	
	render() {
		const style = {
			wire: {
			    stroke: 'rgb(136, 136, 136)',
			    strokeWidth: 3,
			    fill: 'none',
			    pointerEvents: 'none',
			    zIndex: 100,
			}
		}
		const curve = {
			scale: 0.75
		}

		const node = {
			width: 100,
			height: 30
		}

		let wires = [];

		let source = this.props;
		let nodes = this.props.nodes;

		let lineCurveScale = 0.75;

		source.wires && source.wires.forEach( (port) => {
			port.forEach( (target_id) => {

				let target = nodes.find( (n, i) => n.id === target_id);

				let numOutputs = source.outputs || 1;
                let sourcePort = sourcePort || 0;
                let y = -((numOutputs-1)/2)*13 +13*sourcePort;

                let dy = target.y-(source.y+y);
                let dx = (target.x-target.w/2)-(source.x+source.w/2);
                let delta = Math.sqrt(dy*dy+dx*dx);
                let scale = lineCurveScale;
                let scaleY = 0;
                if (delta < node.width) {
                    scale = 0.75-0.75*((node.width-delta)/node.width);
                }

                if (dx < 0) {
                    scale += 2*(Math.min(5*node.width,Math.abs(dx))/(5*node.width));
                    if (Math.abs(dy) < 3*node.height) {
                        scaleY = ((dy>0)?0.5:-0.5)*(((3*node.height)-Math.abs(dy))/(3*node.height))*(Math.min(node.width,Math.abs(dx))/(node.width)) ;
                    }
                }

                let wire = {};

                wire.x1 = source.x+source.w/2;
                wire.y1 = source.y+y;
                wire.x2 = target.x-target.w/2;
                wire.y2 = target.y;

                let path = "M "+(source.x+source.w/2)+" "+(source.y+y)+
                    " C "+(source.x+source.w/2+scale*node.width)+" "+(source.y+y+scaleY*node.height)+" "+
                    (target.x-target.w/2-scale*node.width)+" "+(target.y-scaleY*node.height)+" "+
                    (target.x-target.w/2)+" "+target.y;

				wires.push (
					<g key={uuid.v4()} >
						<path d={path} style={style.wire} />
					</g>
				)
			})
		})

		return (
			<g key={uuid.v4()}>
				{wires}
			</g>
		);
	}
}