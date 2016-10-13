import React, { Component } from 'react';

import Draggable from 'react-draggable';

export default class Node extends Component {
	constructor(props) {
		super(props);

		/*this.state = {
            x: this.props.x,
            y: this.props.y,
            scale: 1,
            dragging: false,
            coords: {
            	x: 0,
            	y: 0,
            }
        }*/

        this.state = {
        	isElementSVG: true,
        	activeDrags: 0,
        	deltaPosition: {
          		x: this.props.x, 
          		y: this.props.y
        	},
        	controlledPosition: {
          		x: this.props.x, 
          		y: this.props.y
        	}
      	};

        /*
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseWheel = this.onMouseWheel.bind(this);
        */

        this.handleDrag = this.handleDrag.bind(this);
        this.onStart = this.onStart.bind(this);
        this.onStop = this.onStop.bind(this);
        this.adjustXPos = this.adjustXPos.bind(this);
        this.adjustYPos = this.adjustYPos.bind(this);
        this.onControlledDrag = this.onControlledDrag.bind(this);
        this.onControlledDragStop = this.onControlledDragStop.bind(this);

    }
	handleDrag(e, ui) {
      const {x, y} = this.state.deltaPosition;
      this.setState({
        deltaPosition: {
          x: x + ui.deltaX,
          y: y + ui.deltaY,
        }
      });
    }

    onStart() {
      this.setState({activeDrags: ++this.state.activeDrags});
    }

    onStop() {
      this.setState({activeDrags: --this.state.activeDrags});
    }

    // For controlled component
    adjustXPos(e) {
      e.preventDefault();
      e.stopPropagation();
      const {x, y} = this.state.controlledPosition;
      this.setState({controlledPosition: {x: x - 10, y}});
    }

    adjustYPos(e) {
      e.preventDefault();
      e.stopPropagation();
      const {controlledPosition} = this.state;
      const {x, y} = this.state.controlledPosition;
      this.setState({controlledPosition: {x, y: y - 10}});
    }

    onControlledDrag(e, position) {
      const {x, y} = position;
      this.setState({controlledPosition: {x, y}});
    }

    onControlledDragStop(e, position) {
      const {x, y} = position;
      this.setState({controlledPosition: {x, y}});
    }

	render() {
		const style = {
			node_group: {
				stroke: '#999',
			    cursor: 'move',
			    strokeWidth: 1,
				transformOrigin: '0px 0px 0px',
			},
			node: {
			    strokeWidth: 1,
			    stroke: '#999',
			    cursor: 'move',
			},
			status: {
				display: 'block',
			},
			label: {
			    strokeWidth: 0,
			    fill: '#333',
			    fontSize: '14px',
			    pointerEvents: 'none',
			    WebkitTouchCallout: 'none',
			    WebkitUserSelect: 'none',
			    KhtmlUserSelect: 'none',
			    MozUserSelect: 'none',
			    MsUserSelect: 'none',
			    userSelect: 'none',
			},
			icon: {
				pointerEvents: 'none',
			},
			group: {
				display: 'block',
			},
			selected: {
			    strokeWidth: 2,
			    stroke: '#ff7f0e',
				cursor: 'move',
			},
			status_group: {
				display: 'none',
			},
			port: {
			    stroke: '#999',
			    strokeWidth: 1,
			    fill: '#ddd',
			    cursor: 'crosshair',
			}
		}

		const fill = 'rgb(231, 231, 174)';
		const stroke = 'black';

		const dragHandlers = {onStart: this.onStart, onStop: this.onStop};
      	const {deltaPosition, controlledPosition} = this.state;

		return (
			<Draggable 
	        	{...dragHandlers} 
	        	defaultPosition={{x: this.props.x || 10, y: this.props.y || 10}} 
	        >
				<g style={style.node_group} id="c9a9e951.b286a8" transform="translate(600,85)">
					<rect style={style.selected} rx="5" ry="5" fill="rgb(231, 231, 174)" width="100" height="30"></rect>
					<g className="node_icon_group node_icon_group_right" x="0" y="0" transform="translate(70,0)" style={{pointerEvents: 'none'}}>
						<rect x="0" y="0" className="node_icon_shade" width="30" stroke="none" fill="#000" fillOpacity="0.05" height="30"></rect>
						{/*<image href="icons/white-globe.png" className="node_icon" x="5" width="20" height="30" y="0"></image>*/}
						<path d="M 0 1 l 0 28" className="node_icon_shade_border" strokeOpacity="0.1" stroke="#000" strokeWidth="1"></path>
					</g>
					<text style={style.label} x="62" dy=".35em" textAnchor="end" y="14">http</text>
					<g className="node_status_group" style={{display: 'none'}}>
						<rect className="node_status" x="6" y="1" width="9" height="9" rx="2" ry="2" strokeWidth="3"></rect>
						<text className="node_status_label" x="20" y="9"></text>
					</g>
					{/*<image className="node_error hidden" href="icons/node-error.png" x="90" y="-6" width="10" height="9"></image>
					<image className="node_changed hidden" href="icons/node-changed.png" x="90" y="-6" width="10" height="10"></image>*/}
					<g transform="translate(77,-6)">
					  	<title>node error</title>
  						<path stroke="#ff0000" d="m4.936789,0.982956c0.440537,-0.326329 4.062727,6.689753 4.13615,6.803969c0.073423,0.114216 -8.223351,0.016316 -8.223351,0.016316c-0.024474,0.032632 3.646664,-6.493956 4.087201,-6.820285z" strokeWidth="1.0" fill="#ff6600"/>
					</g>
					<g transform="translate(90,-6)">
						<title>node changed</title>
						<ellipse stroke="#1a6187" ry="4.2" rx="4.2" id="svg_5" cy="5" cx="5" strokeWidth="1.7" fill="#00bcff" width="10" height="10" />
					</g>
					<g style={style.port} transform="translate(-5,10)">
						<rect className="port" rx="3" ry="3" width="10" height="10"></rect>
					</g>
				</g>
			</Draggable>
		);
	}

}

