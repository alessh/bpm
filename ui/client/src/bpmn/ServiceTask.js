import React, { Component } from 'react';
import Bpmn from './BPMN';

import Task from './Task';
import ServiceTaskMarker from './ServiceTaskMarker';
import ServiceTaskFillMarker from './ServiceTaskFillMarker';

export default class ServiceTask extends Bpmn {
	render() {

		let abspos1 = {
	        abspos: {
	          x: 12,
	          y: 18
	        }
	      }

		let abspos2 = {
	        abspos: {
	          x: 17,
	          y: 22
	        }
	      }

		return(

		    <Task {...this.props} >
		        <ServiceTaskMarker fill={'none'} abspos={abspos1} />
		        {/*<ServiceTaskFillMarker fill={'white'} />*/}
		        <ServiceTaskMarker fill={'white'} abspos={abspos2} />
		    </Task>
		    
		);
	}
}