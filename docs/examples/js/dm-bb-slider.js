$(function() {
    // Mock box View
    var BoxView = Backbone.View.extend({
        template: '<%- name %>',
        events: {},
        render: function() {
            this.$el.html(_.template(this.template, this.model.toJSON()));
            return this;
        },
    });

    // Mock boxes collection
    var boxes = new Backbone.Collection([
        {name: 'A'},
        {name: 'B'},
        {name: 'C'},
        {name: 'D'},
        {name: 'E'},
        {name: 'F'},
        {name: 'G'},
        {name: 'H'},
        {name: 'I'},
        {name: 'J'},
        {name: 'K'},
        {name: 'L'},
        {name: 'M'},
        {name: 'N'},
    ]);

    // Non-optional options:
    // * scrollSurface
    var slider = new kb.Slider({
        el: '#box_2',
        collection: boxes,
        view: BoxView,
        single: false,
    });

});