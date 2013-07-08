$(function() {
    // Mock box View
    var BoxView = Backbone.View.extend({
        template: '<%- name %>',
        events: {
            'click': 'clicked',
        },
        render: function() {
            this.$el.html(_.template(this.template, this.model.toJSON()));
            return this;
        },
        clicked: function() {
            if (!this.parent.lock) {
                console.log('clicked view');
            }
        },
    });

    // Mock boxes collection
    var count;
    var boxes = [];

    function initBoxes() {
        boxes = [];
        for (count = 0; count < 12; count++) {
            boxes.push({name: String(count)});
        }
    }
    initBoxes();

    var slider = new kb.Slider({
        el: '#box_2',
        collection: new Backbone.Collection(boxes),
        view: BoxView,
        single: false, // Render two rows instead of one
        paddingY: 25,
    });

    $('#add').on('click', function() {
        slider.collection.add({name: String(count++)});
    });

    $('#reset').on('click', function() {
        initBoxes();
        slider.collection.reset(boxes);
    });
});