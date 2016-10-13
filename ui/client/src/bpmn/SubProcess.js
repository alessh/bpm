import React from 'react';
import Bpmn from './BPMN';

import Activity from './Activity';
import SubProcessMarker from './SubProcessMarker';

export default class SubProcess extends Bpmn {
	render() {

		return(

		    <Activity {...this.props} >

		    	<SubProcessMarker {...this.props} />

		    </Activity>
		    
		);
	}
}