"use strict";

var aws = require('aws-sdk');
var sns = new aws.SNS();
var lambda = new aws.Lambda();
var unmarshal = require('dynamodb-marshaler').unmarshalItem;
var uuid = require('node-uuid');
var async = require('async');

module.exports = {
	parse: function(event) {
		var msg = {};
		var parseItem = function(item) {
			if (item.Records && item.Records instanceof Array) {
				return item.Records.map(parseItem);
			} else if (item.Records) {
				return parseItem(item.Records);
			} else if (item.Sns && item.Sns.Message) {
				return { 
					id: item.MessageId, 
					topic: item.TopicArn.split(':')[5], 
					timestamp: item.Timestamp,
					payload: JSON.parse(item.Sns.Message)
				}
			} else if (item.Message) {
				return { 
					id: item.MessageId, 
					topic: item.TopicArn.split(':')[5], 
					timestamp: item.Timestamp,
					payload: JSON.parse(event.Message)
				}
			} else if (item.eventSource === "aws:dynamodb") {
				var i = { 
					id: uuid.v4(), 
					topic: item.eventSourceARN.split(':')[5], 
					timestamp: new Date().toISOString(),
					event: item.eventName,
					payload: 
						item.eventName === 'INSERT' || item.eventName === 'MODIFY' ? 
						unmarshal(item.dynamodb.NewImage) : 
						unmarshal(item.dynamodb.OldImage)
				};
				if (item.eventName === 'MODIFY') {
					i.payold = unmarshal(item.dynamodb.OldImage);
				}
				return i;
			} else {
				return item;
			}
		}
		if (event instanceof Array) {
			msg = event.map(parseItem);
		} else {
			msg = parseItem(event);
		}
		
		console.log('Msg: ' + JSON.stringify(msg, null, 2));
		return msg;
	},	
	error: function(err, callback) {
		console.log('Error: ' + err, err.stack); // an error occurred

		var message = {
        	default: JSON.stringify(err)
        };

        const params = {
			Message: JSON.stringify(message),
			MessageStructure: 'json',
			TopicArn: 'arn:aws:sns:us-east-1:631712212114:node-red-aws-deploy-error' 
		}

		sns.publish(
			params, 
			function(err, data) {
				if (!err) {
					console.log('\Successfully dispatch SNS message to ' + params.TopicArn + ':\n', JSON.stringify(message, null, 2)); // successful response
				}
	        	if (callback) callback(err, data);
	    	}
	    );
	},
	debug: function(msg, callback) {
		var context = this;

		var message = {
        	default: JSON.stringify(msg)
        };

        const params = {
			Message: JSON.stringify(message),
			MessageStructure: 'json',
			TopicArn: 'arn:aws:sns:us-east-1:631712212114:node-red-aws-deploy-debug' 
		}

		sns.publish(
			params, 
			function(err, data) {
				if (err) {
					context.error('Error on send message to topic node-red-aws-deploy-debug: ' + err, callback);
				} else {
					console.log('\Successfully dispatch SNS message to ' + params.TopicArn + ':\n', JSON.stringify(message, null, 2)); // successful response
		        	if (callback) callback(err, data);
				}
	    	}
	    );		
	},
	send: function(topic, msg, callback) {
		var context = this;

		// Or, with named functions:
		async.waterfall([
		    checkIfTopicExists.bind(this),
		    ifTopicNotExistsCreate.bind(this),
		    sendMessageToTopic.bind(this),
		], function (err, result) {
		    if (err) {
				callback('Error on send message to topic ' + topic + ': ' + err, callback);
			} else {
				console.log('\Successfully dispatch SNS message to ' + topic + ':\n', JSON.stringify(msg, null, 2)); // successful response
	        	if (callback) callback(null, result);
			}
		});

		function checkIfTopicExists(callback1) {
			this.params = {
			};
			
			var result = function(err, data) {
			  if (err) {
			  	console.log('Err: ' + err);
			  	callback1(err, err.stack); // an error occurred
			  } else {

			  	var found = data.Topics.find( function(k, i) {
			  		return k.TopicArn.split(':')[5] === topic;
			  	})

			  	if (!found && data.NextToken) {
			  		this.params.NextToken = data.NextToken;
			  		sns.listTopics(this.params, result.bind(this));
			  	} else {
			  		console.log('Topic ' + (found ? 'found: ' + JSON.stringify(found, null,2) : 'not found.'));
			  		callback1(null, found);
			  	}
			  }
			}

			sns.listTopics(this.params, result.bind(this));
		}

		function ifTopicNotExistsCreate(existTopic, callback2) {
			if (!existTopic) {
				var params = {
				  Name: topic /* required */
				};
				
				console.log('Topic not exists, creating a new one: ' + topic);

				sns.createTopic(params, function(err, data) {
					console.log('Topic ' + (err ? 'error on create: ' + err : 'created: ' + data.TopicArn));
				  	
					existTopic = data;

				  	var params = {
					  	Protocol: 'sqs', /* required */
					  	TopicArn: data.TopicArn, /* required */
					  	Endpoint: 'arn:aws:sqs:us-east-1:631712212114:bpm-deploy-message-bus'
					};

					sns.subscribe(params, function(err, data) {
					  	console.log('Topic ' + (err ? 'error on subscribe: ' + err : 'subscribed: ' + existTopic.TopicArn));
						
						var params = {
						  	SubscriptionArn: data.SubscriptionArn, /* required */
						  	AttributeName: 'RawMessageDelivery', /* required */
						  	AttributeValue: 'true'
						};
						sns.setSubscriptionAttributes(params, function(err, data) {
						  	console.log('Topic ' + (err ? 'error on set subscribe attributes: ' + err : 'set subscribed attributes: ' + existTopic.TopicArn));
						  	callback2(err, existTopic);           // successful response
						});

					});

				});
			} else {
				console.log('Topic exists, do nothing: ' + existTopic.TopicArn)
				callback2(null, existTopic);
			}
		}

		function sendMessageToTopic(topic, callback3) {
			var message = {
	        	default: JSON.stringify(msg)
	        };

	        const params = {
				Message: JSON.stringify(message),
				MessageStructure: 'json',
				TopicArn: topic.TopicArn
			}

			console.log('Send message to topic: ' + topic.TopicArn);

			sns.publish(
				params, 
				function(err, data) {
					callback3(err, data)
		    	}
		    );			
		}

	},
	call: function(f, msg, callback) {
		lambda.invoke({
			FunctionName: f,
			Payload: JSON.stringify(msg) // pass params
			}, function(err, data) {
				if (err) {
					context.error('Error on send message to topic ' + topic + ': ' + err, callback);
				} else {
					console.log('\Successfully call lambda function ' + f + ':\n', JSON.stringify(msg, null, 2)); // successful response
		        	if (callback) callback(err, data);
				}
				if (callback) callback(err, data);
			}
		);	
	},
	showConfig: function() {
		console.log(JSON.stringify(aws.config, null, 2));
	}
}
