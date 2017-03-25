
var async = require('async');
var msg = require('msg');

const EventEmitter = require('events');

var RED = {

    settings: {
        debugMaxLength: 1000
    },

    nodes: {

        types: {},

        registerType(type, entryPoint) {
            this.types[type] = entryPoint;
            console.log('Register type: ' + type)
        },

        createNode(t, n) {
            console.log('Create node: ' + (n.name || '?'))
        },

        getNode() {

        },

        createNode() {

        }
    },

    library: {
        register: function (type) {
            console.log('Register library: ' + type)
        }
    },

    httpAdmin: {
        post: function () { }
    },

    auth: {
        needsPermission: function () { }
    },

    log: {
        addHandler: function() {}
    },

    httpNode: {
        get: function() { console.log('HTTP get') },
        post: function() { console.log('HTTP post') },
        put: function() { console.log('HTTP put') },
        patch: function() { console.log('HTTP patch') },
        delete: function() { console.log('HTTP delete') }
    }
}

var node_function = require('./function')(RED);
var node_inject = require('./inject')(RED);
var node_debug = require('./debug')(RED);
var node_debug = require('./httpin')(RED);
var node_httprequest = require('./httprequest')(RED);
var node_mqtt = require('./mqtt')(RED);
var node_link = require('./link')(RED);

String.prototype.replaceAll = function (find, replace) {
    var str = this;
    return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace);
};

class node extends EventEmitter {
    send(msg) {
        console.log('node.send:\n' + JSON.stringify(msg, null, 2))
    }
    metric(metric, msg, value) {
        //console.log('Metrica: ' + metric + ':' + value.toString())
    }
    status(fill, shape, text) {
        console.log('node.status: ' + (text || ''))
    }
    error(err, msg) {
        console.log('node.error: ' + err + '\nmsg: ' + msg)
    }
}

exports.handler = function (event, context, callback) {
}


var n_func = new node();
//var func = FunctionNode.bind(n, { name: 'function', topic: '', func: 'msg.payload = msg.payload.mensagem + "mesmo !"\nconsole.log(msg.payload);\nreturn msg' })

var def_func = { 
    id: '12ff3f4e.e8a0e1', 
    type: 'function', 
    z: '8e578671.5d9798', 
    name: '', 
    func: 'msg.payload = msg.payload.mensagem + "mesmo !"\nconsole.log(msg.payload);\nreturn msg;', 
    outputs: 1, 
    noerr: 0, 
    x: 840, 
    y: 1320, 
    wires: [[]]
}

var f_func = RED.nodes.types['function'].bind(n_func, def_func)

f_func();

n_func.emit('input', { _msgid: '123131', payload: { mensagem: 'Oi Amorzinho, funciona ' } });

var n_httpin = new node();

var def_httpin = {
    id: '50da1b16.367dc4',
    type: 'http in',
    z: '8e578671.5d9798',
    name: '/api/task/new',
    url: '/api/task/new',
    method:'post',
    swaggerDoc: '',
    x: 130,
    y: 1060,
    wires:[
        [
            'fac21776.d62e68',
            '9079464e.3a0b48'
        ]
    ]
}

var f_httpin = RED.nodes.types['http in'].bind(n_httpin, def_httpin)

f_httpin();

n_httpin.emit('input', { _msgid: '123131', payload: { mensagem: 'Oi Amorzinho, funciona ' } });

var n_httprequest = new node();

var def_httprequest = {
    id: '50da1b16.367dc4',
    type: 'http in',
    z: '8e578671.5d9798',
    name: '/api/task/new',
    url: '/api/task/new',
    method:'post',
    swaggerDoc: '',
    x: 130,
    y: 1060,
    wires:[
        [
            'fac21776.d62e68',
            '9079464e.3a0b48'
        ]
    ]
}

var f_httprequest = RED.nodes.types['http request'].bind(n_httprequest, def_httprequest)

f_httprequest();

n_httprequest.emit('input', { _msgid: '123131', payload: { mensagem: 'Oi Amorzinho, funciona ' } });


/*class node extends EventEmitter { }

exports.handler = function (event, context, callback) {
    const node = new node();

    node.on('event', () => {
        console.log('an event occurred!');
    });

    node.emit('on');
}*/

//node_func();