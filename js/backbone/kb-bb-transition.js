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
        addName: function(name, index) {
            // TODO Should be an integer
            index = _.isNumber(index) ? index : this.order.length;
            // TODO allow either ids or jQuery object with an id
            var $el = $('#' + name);
            this._add(name, index, $el);
        },
        // TODO Standardize the interfaces for adding names / HTML / jQuery
        addElem: function(name, el, index) {
            // TODO Should be an integer
            index = _.isNumber(index) ? index : this.order.length;
            this._add(name, index, $(el));
        },
        _add: function(name, index, $el) {
            // If an item already exists at the given index, make room for the
            // new item by incrementing the rest of the array
            // TODO What about intentional replacement?
            // TODO Confirm $el exists
            // TODO Check for duplicate names
            if (index in this.order) {
                this.order.splice(index, 0, name);
                this.$pages.splice(index, 0, $el);
                
                // Re-index all the page names, this will include the new name
                // index may be sparse!
                for (var i = 0, len = this.order.length; i < len; i++) {
                    var name = this.order[i];
                    if (name) this.pages[name] = i;
                }
            } else {
                this.order[index] = name;
                this.$pages[index] = $el;
                this.pages[name] = index;
            }
        },
        // The transition events will fire when the animation ends
        // TODO Narrow the prefixes by sniffing
        transitionEvents: 'transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd',
        slideTo: function(page) {
            var lastIndex = this.pointer;
            // Requested page - TODO confirm it exists
            var nextIndex = this.pages[page];

            // If the requested page is the current page, do nothing
            if (nextIndex == lastIndex) return; 

            // Get the current page (which will become last) using the pointer
            var lastName = this.order[lastIndex];
            var nextName = this.order[nextIndex];
            
            // Get the jQuery last and next pages
            var last = $(this.$pages[lastIndex]);
            var next = this.$pages[nextIndex];

            // Turn off any transitionEnds attached to the next element
            // Without this off(), if a user clicks too fast, the page may
            // be hidden
            // TODO Trigger a slideEnd if there was a transition in progress
            next.off(this.transitionEvents, transitionEnd);

            // Hide all elements that are no last or next
            // TODO There should be an easier way to tell if there are active
            // transitions and how to cleanly tear them down
            for (index in this.$pages) {
                var $page = this.$pages[index];
                if ($page != last || $page != next) $page.hide();
            }

            // Update the pointer / history
            this.pointer = nextIndex;

            var lastLeft = (nextIndex < lastIndex) ? 100 : -100;
            var nextLeft = (nextIndex < lastIndex) ? -100 : 100;

            // Set the initial position of pages
            this.reset(last, 0, 1, next, nextLeft, 1);

            var self = this;

            var transitionEnd;
            transitionEnd = function() {
                // Remove the listener
                last.off(this.transitionEvents, transitionEnd);

                last.hide();

                // Fire an event for slide end
                self.trigger('slideEnd:' + nextName, lastName, last, nextName, next);
            } 

            // We use "one", but still remove the event handler because
            // this callback will fire once for *each* of the prefixed
            // transitionend event names (for instance, chrome fires both
            // a "transitionend" and "webkitTransitionEnd")
            last.one(this.transitionEvents, transitionEnd);

            // Start the new transition
            // TODO What's with the timeout? This needs an explanation
            setTimeout(function() {
                self.move(last, lastLeft, 1, next, 0, 1);
                self.trigger('slideStart:' + lastName, lastName, last, nextName, next);
            }, 10);

        },
        // TODO Allow prefixes to be configured with an option
        // TODO Tie these together with the transitionend events
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
