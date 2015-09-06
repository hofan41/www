'use strict';

// Load Modules
var Hapi = require('hapi');
var Joi = require('joi');
var Uspto = require('uspto');

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
    path: '/b/{param*}',
    method: 'GET',
    handler: {
        directory: {
            path: 'bower_components'
        }
    }
}, {
    path: '/assets/{param*}',
    method: 'GET',
    handler: {
        directory: {
            path: 'public'
        }
    }
}, {
    path: '/patents/{page}/{query*}',
    method: 'GET',
    config: {
        validate: {
            params: {
                page: Joi.number().min(1).required(),
                query: Joi.string().required()
            }
        }
    },
    handler: function(request, reply) {
        Uspto.listPatents({
            query: request.params.query,
            page: request.params.page
        }).then(function(data) {
            return reply(data);
        }).catch(function(err) {
            return reply(err);
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
