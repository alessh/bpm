import React, { Component } from 'react';

import sequenceFlowEnd from './svg/sequenceflow-end.svg';
import messageFlowEnd from './svg/messageflow-end.svg';

import Event from './Event';
import StartEvent from './StartEvent';
import MessageEvent from './MessageEvent';
import SignalEvent from './SignalEvent';
import ConditionalEvent from './ConditionalEvent';
import EscalationEvent from './EscalationEvent';
import LinkEvent from './LinkEvent';
import ErrorEvent from './ErrorEvent';
import CancelEvent from './CancelEvent';
import TimerEvent from './TimerEvent';
import CompensateEvent from './CompensateEvent';
import MultipleEvent from './MultipleEvent';
import ParallelMultipleEvent from './ParallelMultipleEvent';

import EndEvent from './EndEvent';
import TerminateEvent from './TerminateEvent';
import IntermediateEvent from './IntermediateEvent';
import IntermediateCatchEvent from './IntermediateCatchEvent';
import IntermediateThrowEvent from './IntermediateThrowEvent';

import Gateway from './Gateway';
import InclusiveGateway from './InclusiveGateway';
import ExclusiveGateway from './ExclusiveGateway';
import ComplexGateway from './ComplexGateway';
import ParallelGateway from './ParallelGateway';
import EventBasedGateway from './EventBasedGateway';

import Activity from './Activity';
import Task from './Task';
import ServiceTask from './ServiceTask';
import UserTask from './UserTask';
import ManualTask from './ManualTask';
import SendTask from './SendTask';
import ReceiveTask from './ReceiveTask';
import ScriptTask from './ScriptTask';
import BusinessRuleTask from './BusinessRuleTask';

import Flow from './Flow';
import SequenceFlow from './SequenceFlow';

import Process from './Process';
import SubProcess from './SubProcess';
import AdHocSubProcess from './AdHocSubProcess';
import Transaction from './Transaction';
import CallActivity from './CallActivity';

import DataObject from './DataObject';
import DataObjectReference from './DataObjectReference';
import DataStoreReference from './DataStoreReference';

import TextAnnotation from './TextAnnotation';

import ParticipantMultiplicityMarker from './ParticipantMultiplicityMarker';
import SubProcessMarker from './SubProcessMarker';
import ParallelMarker from './ParallelMarker';
import SequentialMarker from './SequentialMarker';
import CompensationMarker from './CompensationMarker';
import LoopMarker from './LoopMarker';
import AdhocMarker from './AdhocMarker';

//import { Resizable, ResizableBox } from 'react-resizable';

import Draggable from 'react-draggable';

import uuid from 'node-uuid';

export default class Viewport extends Component {
	constructor(props) {
		super(props);

		this.state = {

			width: this.props.width, 
			height: this.props.height,

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

        this.onResize = this.onResize.bind(this);    	
	}

	onResize = (event, {element, size}) => {
    	this.setState({width: size.width, height: size.height});
  	};

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

	shapeMap = {
	    'bpmn:process': function (props) {
	      return <Process {...props} key={props.key || uuid.v4()} />;
	    },

	    'bpmn:startEvent': function (props) {
	      return <StartEvent {...props} key={props.key || uuid.v4()} />;
	    },

	    'bpmn:task': function (props) {
	      return <Task {...props} key={props.key || uuid.v4()} />;
	    },

	    'bpmn:sequenceFlow': function (props) {
	      return <SequenceFlow {...props} key={props.key || uuid.v4()} />;
	    },

	    'bpmn:endEvent': function (props) {
	      return <EndEvent {...props} key={props.key || uuid.v4()} />;
	    }
	}

	createElements(element) {
    	return this.shapeMap[element.type](element);
  	}

  	render() {
		const style = {
			background: 'lightgray',
			group: {
				stroke: '#999',
			    cursor: 'move',
			    strokeWidth: 1,
				transformOrigin: '0px 0px 0px',
			},
		}

		const TASK_BORDER_RADIUS = 10;

		var fill = 'white';
		var stroke = 'black';
		var strokeWidth = 2;

		var offset = this.props.offset || 0;

		const dragHandlers = {onStart: this.onStart, onStop: this.onStop};
      	const {deltaPosition, controlledPosition} = this.state;

	    return ( 
	      	<svg 
				xmlns="http://www.w3.org/2000/svg" 
				width={this.props.width || '100%'}
				height={this.props.height || '100%'}
				style={style}					
			>

				<Draggable {...dragHandlers} defaultPosition={{x: this.props.x || 0, y: this.props.y || 0}} >
					<g key={uuid.v4()} style={style.group} id="c9a9e951.b28699" transform="translate(600,85)" >
			        {
			          this.props.diagram.map( (e) =>
			            this.createElements(e)
			          )
			        }.bind(this)
			        </g>
		        </Draggable>

	      	</svg> 
	    );

  }

}