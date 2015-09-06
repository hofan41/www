var Backbone = require('backbone');
var $ = require('jquery');
var Models = require('../models');
var PatentView = require('./PatentView');

module.exports = Backbone.View.extend({

    initialize: function() {

        this.collection = new Models.Patents({
            query: ''
        });
        this.loadingHtml = this.$el.html();
        this.$el.html('');
        this.on('reload', this.reload);
        this.listenTo(this.collection, 'reset', this.addAll);
    },
    reload: function(query) {

        this.$el.html(this.loadingHtml);
        this.collection.query = query;
        this.render();
    },
    render: function() {

        // Fetch the collection
        this.collection.fetch({
            reset: true
        });
    },
    addOne: function(patent) {

        var view = new PatentView({
            model: patent
        });
        this.$el.append(view.render().el);
    },
    addAll: function() {

        this.$el.html('');
        this.collection.each(this.addOne, this);
    }
});
