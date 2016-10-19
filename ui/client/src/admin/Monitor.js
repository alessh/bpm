import React, { Component } from 'react';

import 'aws-sdk/dist/aws-sdk';

const aws = window.AWS;

aws.config.update({accessKeyId: 'AKIAJ5DQO6EDKKOXFFMA', secretAccessKey: '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','region': 'sa-east-1'});

const sqs = new aws.SQS(); 

export default class Monitor extends Component {
	constructor(props) {
		super(props);

		this.state = {
			messages: []
		}

		this.errorMessages = this.errorMessages.bind(this);
		this.debugMessages = this.debugMessages.bind(this);
		this.deployMessages = this.deployMessages.bind(this);
	}

	componentWillMount() {
		this.errorMessages();
		this.debugMessages();
		this.deployMessages();
	}

	errorMessages() {
		this.errorMessages.params = {
		  AttributeNames: [
		     "All"
		  ], 
		  MaxNumberOfMessages: 10, 
		  MessageAttributeNames: [
		     "All"
		  ], 
		  QueueUrl: "https://sqs.us-east-1.amazonaws.com/631712212114/bpm-error-messages", 
		  VisibilityTimeout: 30, 
		  WaitTimeSeconds: 20
		 };

		 this.dequeueErrorMessages = function(messages) {
	 		var entries = [];

	 		if (messages.length === 0) return;

	 		messages.forEach( (k) => {
	 			entries.push({
	 				Id: k.MessageId, /* required */
			      	ReceiptHandle: k.ReceiptHandle
	 			})
	 		})

	 		console.log('Delete entries: ' + JSON.stringify(entries, null, 2))
	 		var params = {
			  Entries: entries,
			  QueueUrl: 'https://sqs.us-east-1.amazonaws.com/631712212114/bpm-error-messages' /* required */
			};
			sqs.deleteMessageBatch(params, function(err, data) {
			  if (err) console.log('Dequeue error: '+err); // an error occurred
			  else     console.log('Successful dequeue read messages');           // successful response
			});
	 	}

		 this.errorMessages.result = function(err, data) {
		 	
		 	if (err) {
		 		console.log('Error on message receive: ' + err)
		 	} else {
		 		if (data && data.Messages && data.Messages.length > 0) {
		 			this.setState({
			 			messages: this.state.messages.concat(data.Messages.map( (k) => {k.type = 'error'; return k;}))
			 		}, this.dequeueErrorMessages(data.Messages));
		 		}
		 	}
		 	sqs.receiveMessage(this.errorMessages.params, this.errorMessages.result.bind(this));
		 }.bind(this);

		 sqs.receiveMessage(this.errorMessages.params, this.errorMessages.result.bind(this));
	}

	debugMessages() {
		this.debugMessages.params = {
		  AttributeNames: [
		     "All"
		  ], 
		  MaxNumberOfMessages: 10, 
		  MessageAttributeNames: [
		     "All"
		  ], 
		  QueueUrl: "https://sqs.us-east-1.amazonaws.com/631712212114/bpm-debug-messages", 
		  VisibilityTimeout: 30, 
		  WaitTimeSeconds: 20
		 };

		 this.dequeueDebugMessages = function(messages) {
	 		var entries = [];

	 		if (messages.length === 0) return;

	 		messages.forEach( (k) => {
	 			entries.push({
	 				Id: k.MessageId, /* required */
			      	ReceiptHandle: k.ReceiptHandle
	 			})
	 		})

	 		console.log('Delete entries: ' + JSON.stringify(entries, null, 2))
	 		var params = {
			  Entries: entries,
			  QueueUrl: 'https://sqs.us-east-1.amazonaws.com/631712212114/bpm-debug-messages' /* required */
			};
			sqs.deleteMessageBatch(params, function(err, data) {
			  if (err) console.log('Dequeue error: '+err); // an error occurred
			  else     console.log('Successful dequeue read messages');           // successful response
			});
	 	}

		 this.debugMessages.result = function(err, data) {
		 	
		 	if (err) {
		 		console.log('Error on message receive: ' + err)
		 	} else {
		 		if (data && data.Messages && data.Messages.length > 0) {
		 			this.setState({
			 			messages: this.state.messages.concat(data.Messages.map( (k) => {k.type = 'debug'; return k;}))
			 		}, this.dequeueDebugMessages(data.Messages));
		 		}
		 	}
		 	sqs.receiveMessage(this.debugMessages.params, this.debugMessages.result.bind(this));
		 }.bind(this);

		 sqs.receiveMessage(this.debugMessages.params, this.debugMessages.result.bind(this));
	}	 

	deployMessages() {
		this.deployMessages.params = {
		  AttributeNames: [
		     "All"
		  ], 
		  MaxNumberOfMessages: 10, 
		  MessageAttributeNames: [
		     "All"
		  ], 
		  QueueUrl: "https://sqs.us-east-1.amazonaws.com/631712212114/bpm-deploy-messages", 
		  VisibilityTimeout: 30, 
		  WaitTimeSeconds: 20
		 };

		 this.dequeueDeployMessages = function(messages) {
	 		var entries = [];

	 		if (messages.length === 0) return;

	 		messages.forEach( (k) => {
	 			entries.push({
	 				Id: k.MessageId, /* required */
			      	ReceiptHandle: k.ReceiptHandle
	 			})
	 		})

	 		console.log('Delete entries: ' + JSON.stringify(entries, null, 2))
	 		var params = {
			  Entries: entries,
			  QueueUrl: 'https://sqs.us-east-1.amazonaws.com/631712212114/bpm-deploy-messages' /* required */
			};
			sqs.deleteMessageBatch(params, function(err, data) {
			  if (err) console.log('Dequeue error: '+err); // an error occurred
			  else     console.log('Successful dequeue read messages');           // successful response
			});
	 	}

		 this.deployMessages.result = function(err, data) {
		 	
		 	if (err) {
		 		console.log('Error on message receive: ' + err)
		 	} else {
		 		if (data && data.Messages && data.Messages.length > 0) {
		 			this.setState({
			 			messages: this.state.messages.concat(data.Messages.map( (k) => {k.type = 'deploy'; return k;}))
			 		}, this.dequeueDeployMessages(data.Messages));
		 		}
		 	}
		 	sqs.receiveMessage(this.deployMessages.params, this.deployMessages.result.bind(this));
		 }.bind(this);

		 sqs.receiveMessage(this.deployMessages.params, this.deployMessages.result.bind(this));
	}

	render() {

		const color = {};

		color['debug'] = 'green';
		color['error'] = 'red';
		color['deploy'] = 'blue';

		return(
			<div key={'ADASDADA'} style={{width: '20%', overflow: 'auto'}} >
				{this.state.messages.map( (k, i) =>
					<div 
						key={i} 
						style={{
							borderBottomW: '1 solid gray', 
							color: color[k.type], 
							marginTop: 10, 
							marginBotton: 10, 
							textAlign: 'left', 
							fontFamily: 'monospace',
						    marginTop: 10,
						    textAlign: 'left',
						    fontFamily: 'monospace',
						    borderBottom: 'gray',
						    borderBottomStyle: 'solid',
						    borderBottomWidth: 1,
						    paddingBottom: 10,
						    textOverflow: 'ellipsis',
						    wordWrap: 'break-word',
						    margin: 5
						}} >
						<span>{k.Body}</span>
					</div>
				)}
			</div>

		);

	}
}