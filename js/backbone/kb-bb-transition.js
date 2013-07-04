(function() {

    var Transition = function(options) {
        options || (options = {});
        var names = options.pages || [];

        // Create the registry of pages
        this.pages = {}; // name: index
        this.order = []; // [index] = name
        this.$pages = []; // [index] = $(#name)

        // TODO history
        // pointer starts at 0
        this.pointer = 0;

        for (var i = 0, len = names.length; i < len; i++) {
            var name = names[i];
            var selected = $('#' + name);
            // TODO Confirm object exists
            this.order[i] = name;
            this.$pages[i] = selected;
            // TODO Check for duplicates
            this.pages[name] = i;
        }

        // TODO Allow speed to be set as an option
    };

    var root = this;
    root.kb = root.kb || {};
    root.kb.Transition = Transition;

    _.extend(Transition.prototype, Backbone.Events, {
        // TODO slideRight, slideLeft?
        slideTo: function(page) {
            var lastIndex = this.pointer;
            // Get the current page using the pointer
            var lastName = this.order[lastIndex];
            // TODO Is name needed, or can we use the $page directly?
            var last = $(this.$pages[this.pointer]);

            // Requested page - TODO confirm it exists
            // TODO Make sure the requested page isn't the current page
            var nextIndex = this.pages[page];
            var next = this.$pages[nextIndex];

            // Update the pointer / history
            this.pointer = nextIndex;

            var lastLeft = (nextIndex < lastIndex) ? 100 : -100;
            var nextLeft = (nextIndex < lastIndex) ? -100 : 100;

            // Reset
            this.reset(last, 0, 1, next, nextLeft, 1);

            // Start the new transition
            var self = this;
            // TODO What? This needs an explanation
            setTimeout(function() {
                self.move(last, lastLeft, 1, next, 0, 1);
            }, 10);
            

            var cleanup;
            cleanup = function() {
                // TODO Cancel if another animation has occured
                last.hide();

                // Remove the listener
                last.off('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', cleanup);
            };

            last.on('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', cleanup);
        },
        slideBack: function(page) {

        },
        reset: function(last, lastLeft, lastOpacity, next, nextLeft, nextOpacity) {
            next.removeClass('fx').css({
                '-webkit-transform': 'translate3d(' + nextLeft + '%, 0px, 0px)',
                'opacity': nextOpacity,
                'z-index': 1,
            }).show();

            last.removeClass('fx').css({
                '-webkit-transform': 'translate3d(' + lastLeft + '%, 0px, 0px)',
                'opacity': lastOpacity,
                'z-index': 2,
            }).show();
        },
        move: function(last, lastLeft, lastOpacity, next, nextLeft, nextOpacity) {
            next.addClass('fx').show().css({
                '-webkit-transform': 'translate3d(' + nextLeft + '%, 0px, 0px)',
                'opacity': nextOpacity,
                'z-index': 2,
            });
            last.addClass('fx').css({
                '-webkit-transform': 'translate3d(' + lastLeft + '%, 0px, 0px)',
                'opacity': lastOpacity,
                'z-index': 1,
            });
        },
    });

    // TODO Temporarily place the Transition on the root namespace
    // In the future, only the kb namespace will work
    window.Transition = Transition;

}).call(this);