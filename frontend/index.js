var $ = require('jquery');

var internals = {};

module.exports = internals.components = {
    Models: require('./models'),
    Views: require('./views')
};

var view = new internals.components.Views.PatentListView({
    el: '#patents'
});

$(function() {
    $('#uspto').submit(function(e) {
        e.preventDefault();
        view.trigger('reload', $('#uspto .query').val());
    });
});
