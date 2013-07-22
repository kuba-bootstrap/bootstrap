/*
 * -- Modal Example
 */

$(function() {
    var ExtendedModal = Modal.extend({
        template: Handlebars.compile($('#modal').html()),
        initialize: function(options) {
            console.log('initialize');
        },
        render: function() {
            this.$el.html(this.template());
            console.log('Render Extended Modal');
            return this;
        }
    });

    $('#modalOptionsButton').on('click', function() {
        new ExtendedModal({parentEl: '#pane', open: true});
    });

    // Or attach directly to a button
    // TODO only fires once... by design?
    new ExtendedModal({parentEl: '#pane', button: '#modalButton'})
});
