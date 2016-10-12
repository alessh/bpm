// dependencies
var async = require('async');
var msg = require('msg');

exports.handler = function(event, context, callback) {
	//console.log('Event: ' + JSON.stringify(event, null, 2));
	
	var messages = msg.parse(event);

	async.each(messages, function(message, asyncCallback) {
		var op = message.event.toLowerCase().replace(' ', '-');
		var node = message.payload;
		var type = node.type.toLowerCase().replace(' ', '-');

		msg.send('bpm-deploy-' + type + '-' + op, message, asyncCallback);

		console.log('op: ' + op + ', type: ' + type);

	}, function(err) {

		if (err) {
			msg.error(err, callback);
		} else {
			callback(err, 'Done.');	
		}

	})

}
