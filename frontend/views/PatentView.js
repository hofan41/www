var $ = require('jquery');
var Backbone = require('backbone');
var Jade = require('jade');

module.exports = Backbone.View.extend({
    tagName: 'tr',

    template: Jade.compile($('#patent-template').html()),

    render: function() {

        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});
