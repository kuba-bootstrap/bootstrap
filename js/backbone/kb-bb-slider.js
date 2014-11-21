(function() {

    var Slider = function(options) {
        Backbone.View.call(this, options);
        this.sliderInitialize(options);
    };

    // Add the Slider to the kuba-bootstrap global namespace
    var root = this;
    root.kb = root.kb || {};
    root.kb.Slider = Slider;

    // Sniff touch events that indicate a mobile device
    var isMobile = 'ontouchend' in root;

    if(!navigator.userAgent.match(/(iPhone|iPod|Android|BlackBerry)/)){
        var downEvent = 'touchstart mousedown',
            moveEvent = 'touchmove mousemove',
            upEvent = 'touchend mouseup';
    } else {
        var downEvent = (isMobile) ? 'touchstart ' : 'mousedown ',
            moveEvent = (isMobile) ? 'touchmove ' : 'mousemove ',
            upEvent = (isMobile) ? 'touchend ' : 'mouseup ';
    }

    Slider.extend = Backbone.View.extend;

    _.extend(Slider.prototype, Backbone.View.prototype, {
        // TODO Allow prefixes to be configured with an option
        // A blank prefix results in "transform" and is used by modern IE
        _prefixes: ['', '-webkit-', '-moz-'],
        sliderInitialize: function(options) {
            // Set sane options
            var o = this.options;
            // Element dimensions
            // Width and height are set dynamically in resetItems
            // But these options allow manual override
            this._width = _.isNumber(o.width) ? o.width : undefined;
            this._height = _.isNumber(o.height) ? o.height : undefined;

            this._paddingX = _.isNumber(o.paddingX) ? o.paddingX : 25;
            this._paddingY = _.isNumber(o.paddingY) ? o.paddingY : 50;
            this._force = _.isNumber(o.force) ? o.force : 4;
            this._threshold = _.isNumber(o.threshold) ? o.threshold : 5;

            this._optimize = _.isBoolean(o.optimize) ? o.optimize : false;


            // View and Collection
            // TODO confirm that these are backbone view / collection types
            this.collection || (this.collection = new Backbone.Collection());
            this.view = o.view || Backbone.View;

            // Inject the className
            // TODO This will overwrite any existing className, don't do this!
            // this.view.prototype.className = 'ease-box-double';

            // The lock will be set true when the slider is being moved
            this.lock = false;

            // Save the rendered view objects from each model
            this._views = [];

            // Default to a single row
            this._single = _.isBoolean(o.single) ? o.single : true;
            this._reversed = _.isBoolean(o.reversed) ? o.reversed : false;

            // Initialize private variables for scrolling
            this._pointerX = 0;
            this._pointerY = 0;
            this._scrollSurfacePos = 0;
            this._rightLimit = 0;

            // Render
            this.render();

            // Render the elements in the collection with the given view
            this.resetItems();

            // Check for any changes in viewport width
            // TODO on window?

            // Listen for 'add', 'remove' and 'reset' events in the collection
            // TODO 'reset' changed in backbone 1.0.0 to the smarter set()
            this.listenTo(this.collection, 'add', this.addItem);
            // TODO The remove event should be more specific than a reset
            this.listenTo(this.collection, 'remove', this.resetItems);
            this.listenTo(this.collection, 'reset', this.resetItems);
            // Also listen to sort events
            this.listenTo(this.collection, 'sort', this.resetItems);
        },
        sliderTemplate: '<div class="con-slide-d" style="position:relative"></div>',
        render: function() {
            // Render the inner slider
            this.$el.html(this.sliderTemplate);
            this.$scrollSurface = this.$('.con-slide-d');
            return this;
        },
        // TODO Combine functionality with resetItems / positionItems
        addItem: function(item) {
            // Allow child views to inspect parent properties (such as lock)
            var view = new this.view({model: item, parent: this});

            this._views.push(view);
            this.$scrollSurface.prepend(view.render().el); //TODO: have this reverse order as a parameter - not hardcoded

            // TODO A better way to find index?
            var index = this.collection.length ? this.collection.indexOf(item) : 0;

            // If index is zero, reset the pointers
            if (index == 0) {
                this._pointerX = 0;
                this._pointerY = 1;
            }

            this.calculatePosition(view.$el, index);

            this.resetItems(); //TODO: have this reverse order as a parameter - not hardcoded
        },
        resetItems: function() {
            // Reset existing items
            this.$scrollSurface.html('');
            this._views = [];
            this._rightLimit = 0;

            // Render all elements with the given view
//            this.collection.models.reverse();

            _.each(this.collection.models, function(m) {
                var view = new this.view({model: m, parent: this});
                // TODO better way to tie a model and its view together?

                this._views.push(view);
                this.$scrollSurface.append(view.render().el);

                this.optimizeOnLoad(view);
            }, this);

            // Determine the width and height of a box
            // Items must be the same size!
            if (this.options.width && this.options.height) {
                this._width = this.options.width;
                this._height = this.options.height;
            } else if (this._views.length) {
                this._width = this._views[0].$el.outerWidth();
                this._height = this._views[0].$el.outerHeight();
            }
            // TODO Error if neither are set

            // Also set the scroll surface position to 0 to prevent a smaller
            // number of items from being locked into position off-screen
            this.$scrollSurface.addClass('fx');
            this.moveScrollSurface(0);

            this.positionItems();

            // Enable events, only needs to be called once
            this.bindEvents();

            // this.optimizeFrontContent($(window).width());
        },
        positionItems: function() {
            // Reset variables
            this._columns = 0;

            // The _views array is populated by the resetItems function
            var len = this.collection.length;
            if (len) {
                this._pointerX = 0;
                this._pointerY = 1;

                // Render views in reverse order
                if(this._reversed){
                    this._views.reverse();
                }

                _.each(this._views, function(view, index) {
                    this.calculatePosition(view.$el, index);
                }, this);
            }

            // Change positioning depending on number of rows
            // TODO columns does nothing
            if (!this._single) {
                this._columns = ((len - (len % 2)) / 2) + (len % 5);
            } else { 
                this._columns = len;
            }
        },
        // TODO Allow click events to bubble up (either based on time
        // between mouse/touch up and down or deltaX == 0)
        bindEvents: function() {
            // Disable the slider events to prevent duplicate binds
            this.$el.off(downEvent + ' ' + upEvent);

            // Event variables, enclosed during assignment
            var initialX, viewport;
            var startX = 0;
            var currentX = 0;
            var deltaX = 0;
            var boxPos = 0;
            var self = this;

            // TODO Different handlers for mobile / desktop
            self.$el.on(downEvent, function(e) {
                startX = e.originalEvent.touches ? e.originalEvent.touches[0].pageX : e.pageX;
                initialX = startX;

                // Remove the lock
                self.lock = false;
                
                // Prevent native text selection
                e.preventDefault();

                // Disallow slide if the viewport is wider than the elements
                viewport = self.$el.width();
                if (viewport > self._rightLimit) {
                    // TODO messages should be DEBUG only
                    // console.log('Viewport is wider than items, slider disabled');
                } else {
                    self.$el.on(moveEvent, function(e) {
                        currentX = e.originalEvent.touches ? e.originalEvent.touches[0].pageX : e.pageX;
                        boxPos = 0;

                        deltaX = currentX - startX;
                        startX += deltaX;
                        boxPos = deltaX + self._scrollSurfacePos;

                        // Once the slider moves a threshold number of pixels,
                        // add a lock that child views can inspect
                        if (!self.lock) {
                            var diffX = currentX - initialX;
                            if (Math.abs(diffX) > self._threshold) self.lock = true;
                        }

                        // The function must be called with the View as context
                        self.$scrollSurface.removeClass('fx');
                        self.moveScrollSurface.call(self, boxPos);

                        // TODO The usage of boxPos seems overly complicated
                        self._scrollSurfacePos = boxPos;
                    });
                }
                
            // TODO Should also be called when mouse leaves frame
            }).on(upEvent, function(e) {
                // TODO Hard-coded threshold for movement
                // Only move if deltaX is greater than a specified threshold
                if (Math.abs(deltaX) > 3) {
                    boxPos = (deltaX * self._force) + self._scrollSurfacePos;
                }

                // If the content is smaller than the width of the viewport,
                // anchor the content to the left of the viewport
                if (viewport > self._rightLimit) {
                    boxPos = 0;
                } else {
                    var overflowWidth = self._rightLimit - viewport;
                    // If the viewport is to the left of the boxes, return the
                    // left edge of the viewport to the start of the boxes
                    if (boxPos > 0) {
                        boxPos = 0;
                    // If the viewport is to the right of the boxes, return
                    // the right edge of the viewport to the end of the boxes
                    } else if (boxPos < -overflowWidth) {
                        boxPos = -overflowWidth;
                    }
                }

                // The function must be called with the View as context
                self.$scrollSurface.addClass('fx');
                self.moveScrollSurface.call(self, boxPos);

                self._scrollSurfacePos = boxPos;

                // TODO Should be reset on mouse/touch down, not up?
                deltaX = 0;
                startX = 0;

                // Remove the move event handler
                self.$el.off(moveEvent);

                self.optimizeFrontContent(viewport);

                // Remove the slider "lock" after a tiny delay
                // setTimeout(function() { self.lock = false; });
            });
        },
        moveLeft: function(x) {
            var boxPos = this._scrollSurfacePos - x,
                viewport = this.$el.width();

            // If the content is smaller than the width of the viewport,
            // anchor the content to the left of the viewport
            if (viewport > this._rightLimit) {
                boxPos = 0;
            } else {
                var overflowWidth = this._rightLimit - viewport;
                // If the viewport is to the left of the boxes, return the
                // left edge of the viewport to the start of the boxes

                if (boxPos > 0) {
                    boxPos = 0;
                // If the viewport is to the right of the boxes, return
                // the right edge of the viewport to the end of the boxes
                } else if (boxPos < -overflowWidth) {
                    boxPos = -overflowWidth;
                }
            }

            this.moveScrollSurface.call(this, boxPos);
            this._scrollSurfacePos = boxPos;
        },
        moveRight: function(x) {
            var boxPos = this._scrollSurfacePos + x,
                viewport = this.$el.width();

            // If the content is smaller than the width of the viewport,
            // anchor the content to the left of the viewport
            if (viewport > this._rightLimit) {
                boxPos = 0;
            } else {
                var overflowWidth = this._rightLimit - viewport;
                // If the viewport is to the left of the boxes, return the
                // left edge of the viewport to the start of the boxes
                if (boxPos > 0) {
                    boxPos = 0;
                // If the viewport is to the right of the boxes, return
                // the right edge of the viewport to the end of the boxes
                } else if (boxPos < -overflowWidth) {
                    boxPos = -overflowWidth;
                }
            }

            this.moveScrollSurface.call(this, boxPos);
            this._scrollSurfacePos = boxPos;
        },
        moveScrollSurface: function(x) {
            // Create the cross-platform CSS transform
            // TODO Use CSS sniffing to reduce prefixes
            var transform = 'translate3d(' + x + 'px, 0px, 0px)';
            var styles = {};
            _.each(this._prefixes, function(prefix) {
                styles[prefix + 'transform'] = transform;
            });
            this.$scrollSurface.css(styles);
        },
        calculatePosition: function(box, index) {
            var pos = {};
            // TODO rem is block group?
            var rem = index % 1;

            // TODO Re-calculate for 'n' rows and integrate with _columns
            if (!this._single) {
                if (rem === 0){
                    if (this._pointerY == 0){
                        this._pointerY = 1;
                        this._pointerX = this._pointerX - 1;
                    } else {
                        this._pointerY = 0;
                    }
                }
            } else { 
                this._pointerY = 0;
            }

            pos.x = (this._width * this._pointerX) + (this._paddingX * this._pointerX) + this._paddingX;
            pos.y = (this._paddingY + this._height) * this._pointerY;
            var rightEdge = pos.x + this._width + this._paddingX;
            // Save the x-coord of the right edge for the element farthest
            // to the right. This will be used for force / viewport focus. 
            if (rightEdge > this._rightLimit) this._rightLimit = rightEdge;

            // Create the cross-platform CSS transform for box positioning
            var transform = 'translate3d(' + pos.x + 'px, ' + pos.y + 'px, 0px)';
            var styles = {};
            _.each(this._prefixes, function(prefix) {
                styles[prefix + 'transform'] = transform;
            });

            box.css(styles);
        
            this._pointerX++;
            return this;
        },
        optimizeFrontContent: function(viewport){

            var buffer = 300;

            if(this._optimize){
                var self = this;

                this._views.forEach(function(view){
                    if((view.$el.position().left + buffer) < Math.abs(self._scrollSurfacePos) || view.$el.position().left > (Math.abs(self._scrollSurfacePos) + viewport + buffer)){
                        var image = $(view.$el).find('img');

                        if(!view.stashImg){

                            view.stashImg = image;
                            image.remove();

                        }

                        console.log('remove image', view.stashImg);

                    } else {
                        console.log('add image', view.stashImg);

                        $(view.$el).append(view.stashImg);
                        view.stashImg = undefined;

                    }
                });
            }
        },
        optimizeOnLoad: function(view){
            if(this._optimize){
                var image = $(view.$el).find('img'),
                    buffer = 300;

                image.on('load', function(){
                    
                    console.log(view.$el.position().left);
                    if(view.$el.position().left > $(window).width() + buffer){
                        view.stashImg = image;
                        image.remove();

                        console.log('remove image', view.stashImg);
                    }
                });
            }
        }
    });

    window.Slider = Slider; 

}).call(this);
