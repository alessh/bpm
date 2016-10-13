import React, { Component } from 'react';

import Draggable from 'react-draggable';

export default class BPMN extends Component {
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

    componentDidMount() {
        //document.addEventListener('mousedown', this.onMouseDown, false);
    }

    componentWillUnmount() {
        //Don't forget to unlisten!
        //document.removeEventListener('mousedown', this.onMouseDown, false);
    }

	componentDidUpdate(props, state) {
	    /*if (this.state.dragging && !state.dragging) {
	      document.addEventListener('mousemove', this.onMouseMove)
	      document.addEventListener('mouseup', this.onMouseUp)
	    } else if (!this.state.dragging && state.dragging) {
	      document.removeEventListener('mousemove', this.onMouseMove)
	      document.removeEventListener('mouseup', this.onMouseUp)
	    }*/
	}

	/*
    onMouseDown(event) {
        this.setState({
        	dragging: true,
	        //Set coords
	        coords: {
	            x: event.pageX,
	            y: event.pageY
	        }
	    });
		event.stopPropagation();
    	event.preventDefault();
    }

    onMouseUp(event) {
    	this.setState({
        	dragging: false,
        	coords: {},
    	});
    	event.stopPropagation();
    	event.preventDefault();
    }

    onMouseMove(e) {
    	//If we are dragging
      	if (!this.state.dragging) {
        	return;
      	}
        e.preventDefault();
        //Get mouse change differential
        var xDiff = this.state.coords.x - e.pageX,
            yDiff = this.state.coords.y - e.pageY;
        //Update to our new coordinates
            this.state.coords.x = e.pageX;
            this.state.coords.y = e.pageY;
        //Adjust our x,y based upon the x/y diff from before
        var x = this.state.x - xDiff,       
            y = this.state.y - yDiff;
        //Re-render
        this.setState({x: x, y: y});  
    }

    //So we can handle the mousewheel returning -0 or 0
    isNegative(n) {
      	return ((n = +n) || 1 / n) < 0;
    }

    onMouseWheel(e) {
      	var ZOOM_STEP = .03;
        //require the shift key to be pressed to scroll
        if (!e.shiftKey) {
            return;
        }
      	e.preventDefault();
      	var direction = (this.isNegative(e.deltaX) &&  this.isNegative(e.deltaY) ) ? 'down' : 'up';
      	if (direction == 'up') {
        	this.state.scale += ZOOM_STEP;
      	} else {
        	this.state.scale -= ZOOM_STEP;
      	}
      	this.state.scale = this.state.scale < 0 ? 0 : this.state.scale;
      	this.setState(this.state);
    }
	*/

	getScaledPath(rawPath, param) {

		// positioning
		// compute the start point of the path
		var mx, my;

		if (param.abspos) {
		  mx = param.abspos.x;
		  my = param.abspos.y;
		} else {
		  mx = param.containerWidth * param.position.mx;
		  my = param.containerHeight * param.position.my;
		}

		var coordinates = {}; //map for the scaled coordinates
		if (param.position) {

		  // path
		  var heightRatio = (param.containerHeight / rawPath.height) * param.yScaleFactor;
		  var widthRatio = (param.containerWidth / rawPath.width) * param.xScaleFactor;


		  //Apply height ratio
		  for (var heightIndex = 0; heightIndex < rawPath.heightElements.length; heightIndex++) {
		    coordinates['y' + heightIndex] = rawPath.heightElements[heightIndex] * heightRatio;
		  }

		  //Apply width ratio
		  for (var widthIndex = 0; widthIndex < rawPath.widthElements.length; widthIndex++) {
		    coordinates['x' + widthIndex] = rawPath.widthElements[widthIndex] * widthRatio;
		  }
		}


	    var tokenRegex = /\{([^\}]+)\}/g,
	        objNotationRegex = /(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g, // matches .xxxxx or ["xxxxx"] to run over object properties
	        replacer = function (all, key, obj) {
	            var res = obj;
	            key.replace(objNotationRegex, function (all, name, quote, quotedName, isFunc) {
	                name = name || quotedName;
	                if (res) {
	                    if (name in res) {
	                        res = res[name];
	                    }
	                    typeof res === "function" && isFunc && (res = res());
	                }
	            });
	            res = (res === null || res === obj ? all : res) + "";
	            return res;
	        };


		var params = {
			mx: mx,
			my: my,
			e: coordinates
		};

		var path = rawPath.d.replace(tokenRegex, function (all, key) {
            return replacer(all, key, params);
        });

		return path;
	}

	drawPath(p, d, attrs) {

	    /*attrs = computeStyle(attrs, [ 'no-fill' ], {
	      strokeWidth: 2,
	      stroke: 'black'
	    });

	    return p.path(d).attr(attrs);*/
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

	render(path) {
		const dragHandlers = {onStart: this.onStart, onStop: this.onStop};
      	const {deltaPosition, controlledPosition} = this.state;

		return (
			
			<Draggable 
        {...dragHandlers} 
        defaultPosition={{x: this.props.x, y: this.props.y}} 
        >
			    <g 
			    	stroke={this.props.stroke || '#000000'} 
			    	fill={this.props.fill || '#ffffff'} 
			    >
            <path d={this.props.path} style={{strokeWidth: this.props.strokeWidth || 1}} />
			    </g>
			</Draggable>

		);
	}	
	
}