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
        var query = $('#uspto .query').val().replace(/[^a-zA-Z\d./]/g, '-');
        if (query) {
            view.trigger('reload', query);
        }
    });
});
