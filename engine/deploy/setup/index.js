"use strict";

var aws = require('aws-sdk');
var async = require('async');
var msg = require('msg');
var sns = new aws.SNS();

var nodes = require('nodes.json');

String.prototype.replaceAll = function (find, replace) {
    var str = this;
    return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace);
};

exports.handler = function(event, context, callback) {
	console.log('Event: ' + JSON.stringify(event, null, 2));

	async.each(nodes, function(node, asyncCallback) {

		var op = 'insert';
		var type = node.type.toLowerCase().replaceAll(' ', '-').replaceAll(':', '-');

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

	}, function(err) {

		if (err) {
			msg.error(err, callback);
		} else {
			callback(err, 'Done.');	
		}

	})

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

}
