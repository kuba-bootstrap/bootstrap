(function() {

    var Transition = function(options) {
        Backbone.View.call(this, options);
        this.transitionInitialize(options);
    };

    var root = this;
    root.kb = root.kb || {};
    root.kb.Transition = Transition;

    Transition.extend = Backbone.View.extend;

    _.extend(Transition.prototype, Backbone.View.prototype, {
        transitionInitialize: function(options) {
            this.parentEl = this.options.parentEl || 'body';
            $(this.parentEl).append(this.render().el);
            this.transition();
        },
        transition: function(){
            var self = this;

        },
        moveTransition: function(){
            
        }
    });

    window.Transition = Transition;

}).call(this);