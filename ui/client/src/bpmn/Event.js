import React, { Component } from 'react';
import Bpmn from './BPMN';

import Draggable from 'react-draggable';

export default class Event extends Bpmn {
	constructor(props) {
		super(props);

        this.state = {
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

  createPathFromConnection(element) {
    var waypoints = element.waypoints;

    var pathData = 'm  ' + waypoints[0].x + ',' + waypoints[0].y;
    for (var i = 1; i < waypoints.length; i++) {
      pathData += 'L' + waypoints[i].x + ',' + waypoints[i].y + ' ';
    }
    return pathData;
  }

	render() {
		const dragHandlers = {onStart: this.onStart, onStop: this.onStop};
      	const {deltaPosition, controlledPosition} = this.state;

		let strokeWidth = this.props.strokeWidth || 2;

	    let cx = ((this.props.width + (strokeWidth / 2)) / 2) || 0,
	        cy = ((this.props.height + (strokeWidth / 2)) / 2) || 0;

		return(

			<Draggable {...dragHandlers} defaultPosition={{x: this.props.x, y: this.props.y}} >
		    <g 
          stroke={this.props.stroke || '#000000'} 
          fill={this.props.fill || '#ffffff'} 
        >
	        
	        <circle 
	        	cx={cx} 
	        	cy={cy} 
	        	r={Math.round((this.props.width + this.props.height) / 4 - (this.props.offset || 0))} 
	        	stroke={this.props.stroke || '#000000'} 
	        	fill={this.props.fill || '#ffffff'} 
	        	style={{strokeWidth: this.props.strokeWidth || 2}}
	        />

          {this.props.children}

          {this.props.text ? (<text x="0" y={this.props.height + 20} fill="red">{this.props.text}</text>) : (null)}

		    </g>
			</Draggable>
		);
	}
}