'use strict';

// Load Modules
var Hapi = require('hapi');

// Declare internals
var internals = {};

var server = new Hapi.Server();

// Configure server to port 80
server.connection({
	port: 8080
});

var defaultContext = {
	title: 'hofan41.com'
};

// Configure server view engine
server.views({
	engines: {
		jade: require('jade')
	},
	relativeTo: __dirname,
	path: './views',
	isCached: false,
	context: defaultContext
});

// Register any plugins
server.route({
	path: '/',
	method: 'GET',
	handler: function(request, reply) {
		return reply.view('index');
	}
});

server.start(function(err){
	if(err) {
		console.error(err);
	} else {
		console.log('server started!');
	}
});
