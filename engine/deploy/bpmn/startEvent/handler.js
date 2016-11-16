'use strict';
var Promise = require('bluebird');

var aws = require('aws-sdk');

aws.config.setPromisesDependency(Promise);

var dynamodb = new aws.DynamoDB.DocumentClient();

module.exports.startEvent = (event, context, callback) => {
  /*const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      event: event,
    }),
  };*/

  var params = {
    TableName: 'bpmn',
    Item: { id: 'teste', type: '123 testando'}
  }

  dynamodb.put(params).promise()
  .then(function(data) {
    console.log('Promise success :)')
    callback(null, 'Promise success :)');
  })
  .catch(function(err) {
    console.log('Promise fail :(')
    callback(err, 'Promise fail :(');
  })

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};
