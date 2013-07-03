(function() {

    var Transition = function(options) {
        console.log('transition constructor function!')
        // Create the registry

    };

    var root = this;
    root.kb = root.kb || {};
    root.kb.Transition = Transition;

    // TODO Extend?

    _.extend(Transition.prototype, Backbone.Events, {

    });

    // TODO Temporarily place the Transition on the root namespace
    // In the future, only the kb namespace will work
    window.Transition = Transition;

}).call(this);