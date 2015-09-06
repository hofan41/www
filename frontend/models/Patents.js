var Backbone = require('backbone');

var internals = {};

module.exports = Backbone.Collection.extend({
    initialize: function(options) {
        this.query = options.query;
        this.page = 1;
    },
    url: function() {
        return '/patents/' + this.page + '/' + this.query;
    },
    parse: function(data) {
        this.startIndex = data.startIndex;
        this.endIndex = data.endIndex;
        this.totalCount = data.totalCount;
        return data.patentList;
    }
});
