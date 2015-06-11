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
server.route([{
	path: '/',
	method: 'GET',
	handler: function(request, reply) {
		return reply.view('index');
	}
}, {
	path: '/getPatents',
	method: 'GET',
	handler: function(request, reply) {
		var Wreck = require('wreck');
		var method = 'GET';
		var uri = 'http://patft.uspto.gov/netacgi/nph-Parser?Sect1=PTO2&Sect2=HITOFF&p=1&u=%2Fnetahtml%2FPTO%2Fsearch-bool.html&r=0&f=S&l=50&TERM1=KANG%2C+HO-FAN&FIELD1=INNM&co1=AND&TERM2=&FIELD2=&d=PTXT';

		Wreck.request(method, uri, null, function(err, response) {
			if (err) {
				reply(err);
			} else {
				Wreck.read(response, null, function(err, payload) {
					if (err) {
						reply(err);
					}
					reply(payload);
				})
			}
		});
	}
}]);

server.start(function(err) {
	if (err) {
		console.error(err);
	} else {
		console.log('server started!');
	}
});