// dependencies
var async = require('async');
var msg = require('msg');

String.prototype.replaceAll = function (find, replace) {
    var str = this;
    return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace);
};

exports.handler = function(event, context, callback) {
	console.log('Event: ' + JSON.stringify(event, null, 2));
	
	var messages = msg.parse(event);

	async.each(messages, function(message, asyncCallback) {
		var op = message.event.toLowerCase().replace(' ', '-');
		var node = message.payload;
		var type = node.type.toLowerCase().replaceAll(' ', '-').replaceAll(':', '-');

		msg.send('bpm-deploy-node-' + type + '-' + op, message, asyncCallback);

		console.log('op: ' + op + ', type: ' + type);

	}, function(err) {

		if (err) {
			msg.error(err, callback);
		} else {
			callback(err, 'Done.');	
		}

	})

}
