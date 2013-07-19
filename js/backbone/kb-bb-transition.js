(function() {

    var Transition = function(options) {
        options || (options = {});
        var names = options.pages || [];

        // Create the registry of pages
        this.pages = {}; // name: index
        this.order = []; // [index] = name
        this.$pages = []; // [index] = $(#name)

        // TODO Instead of a pointer, maintain a history?
        this.pointer = 0;

        _.each(names, this.addName, this);
        // TODO Allow speed to be set as an option
        // Unfortunately, speed is set by a CSS style, which will need to
        // be modified on each element
    };

    // Attach Transition to the window, but through the namespace 'kb'
    var root = this;
    root.kb = root.kb || {};
    root.kb.Transition = Transition;

    _.extend(Transition.prototype, Backbone.Events, {
        // TODO Allow addition at a specific index
        addName: function(name, index) {
            // TODO Should be an integer
            index = _.isNumber(index) ? index : this.order.length;
            // TODO allow either ids or jQuery object with an id
            var $el = $('#' + name);
            this._add(name, index, $el);
        },
        // TODO Standardize the interfaces
        addElem: function(name, el, index) {
            // TODO Should be an integer
            index = _.isNumber(index) ? index : this.order.length;
            this._add(name, index, $(el));
        },
        _add: function(name, index, $el) {
            // TODO If an item already exists at the given index, it should
            // move the other pages aside
            // TODO Confirm object exists
            this.order[index] = name;
            this.$pages[index] = $el;
            // TODO Check for duplicates
            this.pages[name] = index;
        },
        slideTo: function(page) {
            var lastIndex = this.pointer;
            // Get the current page using the pointer
            var lastName = this.order[lastIndex];
            var last = $(this.$pages[lastIndex]);

            // Requested page - TODO confirm it exists
            // TODO Make sure the requested page isn't the current page
            var nextIndex = this.pages[page];
            var nextName = this.order[nextIndex];
            var next = this.$pages[nextIndex];

            // Update the pointer / history
            this.pointer = nextIndex;

            var lastLeft = (nextIndex < lastIndex) ? 100 : -100;
            var nextLeft = (nextIndex < lastIndex) ? -100 : 100;

            // Set the initial position of pages
            this.reset(last, 0, 1, next, nextLeft, 1);

            var self = this;

            // The event "transitionend" will fire when the animation ends
            // TODO Could also ignore this prefix nonsense by sniffing
            var transitionEnd;
            transitionEnd = function() {
                // TODO Cancel if another animation has occured

                // Remove the listener
                last.off('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', transitionEnd);

                last.hide();

                // Fire an event for slide end
                self.trigger('slideEnd', lastName, last, nextName, next);
            } 

            // We use "one", but still remove the event handler because
            // this callback will fire for once for each of the prefixed
            // transitionend event names
            last.one('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', transitionEnd);

            // Start the new transition
            // TODO What's with the timeout? This needs an explanation
            setTimeout(function() {
                self.move(last, lastLeft, 1, next, 0, 1);
                self.trigger('slideStart', lastName, last, nextName, next);
            }, 10);

        },
        // TODO Allow prefixes to be configured with an option
        // A blank prefix results in "transform" and is used by modern IE
        _prefixes: ['', '-webkit-', '-moz-'],
        _buildTranslate: function(left) {
            return ('translate3d(' + left + '%, 0px, 0px)');
        },
        reset: function(last, lastLeft, lastOpacity, next, nextLeft, nextOpacity) {
            var nextTranslate = this._buildTranslate(nextLeft);
            var nextCSS = {
                'opacity': nextOpacity,
                'z-index': 1,
            };

            var lastTranslate = this._buildTranslate(lastLeft);
            var lastCSS = {
                'opacity': lastOpacity,
                'z-index': 2,
            };
            // TODO Generalize?
            for (var i = 0, len = this._prefixes.length; i < len; i++) {
                nextCSS[this._prefixes[i] + 'transform'] = nextTranslate;
                lastCSS[this._prefixes[i] + 'transform'] = lastTranslate;
            }

            next.removeClass('fx').css(nextCSS).show();
            last.removeClass('fx').css(lastCSS).show();
        },
        move: function(last, lastLeft, lastOpacity, next, nextLeft, nextOpacity) {
            var nextTranslate = this._buildTranslate(nextLeft);
            var nextCSS = {
                'opacity': nextOpacity,
                'z-index': 2,
            };

            var lastTranslate = this._buildTranslate(lastLeft);
            var lastCSS = {
                'opacity': lastOpacity,
                'z-index': 1,
            };
            // TODO Generalize?
            for (var i = 0, len = this._prefixes.length; i < len; i++) {
                nextCSS[this._prefixes[i] + 'transform'] = nextTranslate;
                lastCSS[this._prefixes[i] + 'transform'] = lastTranslate;
            }

            next.addClass('fx').css(nextCSS).show();
            last.addClass('fx').css(lastCSS).show();
        },
    });

    // TODO Temporarily place the Transition on the root namespace
    // In the future, only the kb namespace will work
    window.Transition = Transition;

}).call(this);
