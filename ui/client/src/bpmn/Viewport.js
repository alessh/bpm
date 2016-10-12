import React, { Component } from 'react';

import sequenceFlowEnd from './sequenceflow-end.svg';
import messageFlowEnd from './messageflow-end.svg';

import Event from './../bpmn/Event';
import StartEvent from './../bpmn/StartEvent';
import MessageEvent from './../bpmn/MessageEvent';
import SignalEvent from './../bpmn/SignalEvent';
import ConditionalEvent from './../bpmn/ConditionalEvent';
import EscalationEvent from './../bpmn/EscalationEvent';
import LinkEvent from './../bpmn/LinkEvent';
import ErrorEvent from './../bpmn/ErrorEvent';
import CancelEvent from './../bpmn/CancelEvent';
import TimerEvent from './../bpmn/TimerEvent';
import CompensateEvent from './../bpmn/CompensateEvent';
import MultipleEvent from './../bpmn/MultipleEvent';
import ParallelMultipleEvent from './../bpmn/ParallelMultipleEvent';

import EndEvent from './../bpmn/EndEvent';
import TerminateEvent from './../bpmn/TerminateEvent';
import IntermediateEvent from './../bpmn/IntermediateEvent';
import IntermediateCatchEvent from './../bpmn/IntermediateCatchEvent';
import IntermediateThrowEvent from './../bpmn/IntermediateThrowEvent';

import Gateway from './../bpmn/Gateway';
import InclusiveGateway from './../bpmn/InclusiveGateway';
import ExclusiveGateway from './../bpmn/ExclusiveGateway';
import ComplexGateway from './../bpmn/ComplexGateway';
import ParallelGateway from './../bpmn/ParallelGateway';
import EventBasedGateway from './../bpmn/EventBasedGateway';

import Task from './../bpmn/Task';
import ServiceTask from './../bpmn/ServiceTask';
import UserTask from './../bpmn/UserTask';
import ManualTask from './../bpmn/ManualTask';
import SendTask from './../bpmn/SendTask';
import ReceiveTask from './../bpmn/ReceiveTask';
import ScriptTask from './../bpmn/ScriptTask';
import BusinessRuleTask from './../bpmn/BusinessRuleTask';

import Activity from './../bpmn/Activity';
import SubProcess from './../bpmn/SubProcess';
import AdHocSubProcess from './../bpmn/AdHocSubProcess';
import Transaction from './../bpmn/Transaction';
import CallActivity from './../bpmn/CallActivity';

import DataObject from './../bpmn/DataObject';
import DataObjectReference from './../bpmn/DataObjectReference';
import DataStoreReference from './../bpmn/DataStoreReference';

import TextAnnotation from './../bpmn/TextAnnotation';

import ParticipantMultiplicityMarker from './../bpmn/ParticipantMultiplicityMarker';
import SubProcessMarker from './../bpmn/SubProcessMarker';
import ParallelMarker from './../bpmn/ParallelMarker';
import SequentialMarker from './../bpmn/SequentialMarker';
import CompensationMarker from './../bpmn/CompensationMarker';
import LoopMarker from './../bpmn/LoopMarker';
import AdhocMarker from './../bpmn/AdhocMarker';

import { Resizable, ResizableBox } from 'react-resizable';

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

	render() {
		const style = {
			background: 'lightgray'
		}

		return (

			<svg 
				xmlns="http://www.w3.org/2000/svg" 
				width={this.props.width}
				height={this.props.height}
				style={style}					
			>
				
				{this.props.children}

			</svg>

		)
	}
}