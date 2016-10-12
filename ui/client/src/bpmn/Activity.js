import React, { Component } from 'react';
import Bpmn from './BPMN';

import Draggable from 'react-draggable';

export default class Activity extends Bpmn {
	constructor(props) {
		super(props);

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

		const TASK_BORDER_RADIUS = 10;

		var fill = 'white';
		var stroke = 'black';
		var strokeWidth = 2;

		var offset = this.props.offset || 0;

		const dragHandlers = {onStart: this.onStart, onStop: this.onStop};
      	const {deltaPosition, controlledPosition} = this.state;

		return(

			<Draggable {...dragHandlers} defaultPosition={{x: this.props.x, y: this.props.y}} >
			    <g 
			    	stroke={this.props.stroke || '#000000'} 
			    	fill={this.props.fill || '#ffffff'}
			    >

			        <rect 
			        	x={this.props.offset || 0} 
			        	y={this.props.offset || 0} 
			        	width={this.props.width - offset * 2} 
			        	height={this.props.height - offset * 2} 
			        	rx={TASK_BORDER_RADIUS} 
			        	ry={TASK_BORDER_RADIUS} 
			        	stroke={this.props.stroke || stroke} 
			        	fill={this.props.fill || fill} 
			        	style={{strokeWidth: this.props.strokeWidth || strokeWidth}} 
			        />

			        {this.props.children}

			    </g>
			</Draggable> 

		);
	}
}