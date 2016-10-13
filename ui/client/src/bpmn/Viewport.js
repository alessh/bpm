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

import uuid from 'node-uuid';

export default class Viewport extends Component {
	constructor(props) {
		super(props);

		this.state = {
			width: this.props.width, 
			height: this.props.height
		};

		this.onResize = this.onResize.bind(this);
	}

	onResize = (event, {element, size}) => {
    	this.setState({width: size.width, height: size.height});
  	};


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
			background: 'lightgray'
		}

	    return ( 
	      	<svg 
				xmlns="http://www.w3.org/2000/svg" 
				width={this.props.width || '100%'}
				height={this.props.height || '100%'}
				style={style}					
			>
		        {
		          this.props.diagram.map( (e) =>
		            this.createElements(e)
		          )
		        }.bind(this)
	      	</svg> 
	    );

  }

}