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

		this.messageReceive = this.messageReceive.bind(this);
	}

	componentWillMount() {
		this.messageReceive();
	}

	messageReceive() {
		this.params = {
		  AttributeNames: [
		     "All"
		  ], 
		  MaxNumberOfMessages: 10, 
		  MessageAttributeNames: [
		     "All"
		  ], 
		  QueueUrl: "https://sqs.us-east-1.amazonaws.com/631712212114/bpm-deploy-message-bus", 
		  VisibilityTimeout: 30, 
		  WaitTimeSeconds: 20
		 };

		 this.dequeueMessages = function(messages) {
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
			  QueueUrl: 'https://sqs.us-east-1.amazonaws.com/631712212114/bpm-deploy-message-bus' /* required */
			};
			sqs.deleteMessageBatch(params, function(err, data) {
			  if (err) console.log('Dequeue error: '+err); // an error occurred
			  else     console.log('Sucessful dequeue read messages');           // successful response
			});
	 	}

		 this.result = function(err, data) {
		 	
		 	if (err) {
		 		console.log('Error on message receive: ' + err)
		 	} else {
		 		if (data && data.Messages && data.Messages.length > 0) {
		 			this.setState({
			 			messages: this.state.messages.concat(data.Messages)
			 		}, this.dequeueMessages(data.Messages));
		 		}
		 	}
		 	sqs.receiveMessage(this.params, this.result.bind(this));
		 }.bind(this);

		 sqs.receiveMessage(this.params, this.result.bind(this));
		   /*
		   data = {
		    Messages: [
		       {
		      Attributes: {
		       "ApproximateFirstReceiveTimestamp": "1442428276921", 
		       "ApproximateReceiveCount": "5", 
		       "SenderId": "AIDAIAZKMSNQ7TEXAMPLE", 
		       "SentTimestamp": "1442428276921"
		      }, 
		      Body: "My first message.", 
		      MD5OfBody: "1000f835...a35411fa", 
		      MD5OfMessageAttributes: "9424c491...26bc3ae7", 
		      MessageAttributes: {
		       "City": {
		         DataType: "String", 
		         StringValue: "Any City"
		        }, 
		       "PostalCode": {
		         DataType: "String", 
		         StringValue: "ABC123"
		        }
		      }, 
		      MessageId: "d6790f8d-d575-4f01-bc51-40122EXAMPLE", 
		      ReceiptHandle: "AQEBzbVv...fqNzFw=="
		     }
		    ]
		   }
		   */

	}

	render() {

		return(
			<div key={'ADASDADA'} >
			{this.state.messages.map( (k, i) =>
				<div key={i} >
					<span>{k.Body}</span>
				</div>
			)}
			</div>

		);

	}
}