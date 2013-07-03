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
    var downEvent = (isMobile) ? 'touchstart ' : 'mousedown ',
        moveEvent = (isMobile) ? 'touchmove ' : 'mousemove ',
        upEvent = (isMobile) ? 'touchend ' : 'mouseup ';

    Slider.extend = Backbone.View.extend;

    _.extend(Slider.prototype, Backbone.View.prototype, {
        sliderInitialize: function(options) {
            // Set sane options
            var o = this.options;
            // Element dimensions
            // Width and height are set dynamically in resetItems
            // TODO Allow manual override
            this._width = _.isNumber(o.width) ? o.width : 200;
            this._height = _.isNumber(o.height) ? o.height : 200;

            this._paddingX = _.isNumber(o.paddingX) ? o.paddingX : 25;
            this._paddingY = _.isNumber(o.paddingY) ? o.paddingY : 50;
            this._force = _.isNumber(o.force) ? o.force : 4;

            // View and Collection
            // TODO confirm that these are backbone view / collection types
            this.collection || (this.collection = new Backbone.Collection());
            this.view = o.view || Backbone.View;

            // Inject the className
            // TODO This will overwrite any existing className, don't do this!
            this.view.prototype.className = 'ease-box-double';

            // Save the rendered view objects from each model
            this._views = [];

            // Default to a single row
            this._single = _.isBoolean(o.single) ? o.single : true;

            // Initialize private variables for scrolling
            this._pointerX = 0;
            this._pointerY = 0;
            this._scrollSurfacePos = 0;
            this._rightLimit = 0;

            // Render
            this.render();

            // Render the elements in the collection with the given view
            this.resetItems();

            // Combine into one function
            this.positionItems();
            this.bindEvents();

            // Listen for 'add' and 'reset' events in the collection
            this.listenTo(this.collection, 'add', this.addItem);
            this.listenTo(this.collection, 'reset', this.resetItems);
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
            var view = new this.view({model: item});
            this._views.push(view);
            this.$scrollSurface.append(view.render().el);

            // TODO A better way to find index?
            var index = this.collection.indexOf(item);
            this.calculatePosition(view.$el, index);
        },
        resetItems: function() {
            // Reset existing items
            this.$scrollSurface.html('');
            this._views = [];
            this._rightLimit = 0;

            // Render all elements with the given view
            _.each(this.collection.models, function(m) {
                var view = new this.view({model: m});
                // TODO better way to tie a model and its view together?
                this._views.push(view);
                this.$scrollSurface.append(view.render().el);
            }, this);

            // Determine the width and height of a box
            // Items must be the same size!
            if (this._views.length) {
                this._width = this._views[0].$el.outerWidth();
                this._height = this._views[0].$el.outerHeight();
            }

            // TODO Combine functionality
            this.positionItems();
        },
        positionItems: function() {
            // Reset variables
            this._columns = 0;

            // The _views array is populated by the resetItems function
            var len = this.collection.length;
            if (len) {
                this._pointerX = 0;
                this._pointerY = 1;
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
            // Event variables, enclosed during assignment
            var startX = 0;
            var currentX = 0;
            var deltaX = 0;
            var boxPos = 0;
            var self = this;

            // TODO Different handlers for mobile / desktop
            self.$el.on(downEvent, function(e) {
                startX = e.originalEvent.touches ? e.originalEvent.touches[0].pageX : e.pageX;
                
                // Prevent native text selection
                e.preventDefault();
                
                self.$el.on(moveEvent, function(e) {
                    currentX = e.originalEvent.touches ? e.originalEvent.touches[0].pageX : e.pageX;
                    boxPos = 0;

                    deltaX = currentX - startX;
                    startX += deltaX;
                    boxPos = deltaX + self._scrollSurfacePos;

                    // TODO A more common CSS style
                    self.$scrollSurface.css('-webkit-transform', 'translate3d(' + boxPos + 'px, 0px, 0px)');

                    // TODO This seems overly complicated
                    self._scrollSurfacePos = boxPos;

                });
            // TODO Should also be called when mouse leaves frame
            }).on(upEvent, function(e) {
                boxPos = (deltaX * self._force) + self._scrollSurfacePos;

                var viewport = self._rightLimit - $(window).width();
                // If the viewport is to the left of the boxes, return the
                // left edge of the viewport to the start of the boxes.
                if (boxPos > 0) {
                    boxPos = 0;
                // If the viewport is to the right of the boxes, return the
                // right edge of the viewport to the end of the boxes.
                } else if (boxPos < -viewport) {
                    boxPos = -viewport;
                }

                self.$scrollSurface.css('-webkit-transform', 'translate3d(' + boxPos + 'px, 0px, 0px)');
                self._scrollSurfacePos = boxPos;

                // TODO Should be reset on mouse/touch down, not up?
                deltaX = 0;
                startX = 0;

                // Remove the move event handler
                self.$el.off(moveEvent);
            });
        },
        calculatePosition: function(box, index) {
            var pos = {};
            // TODO rem is block group?
            var rem = index % 5;

            // TODO Re-calculate for 'n' rows and integrate with _columns
            if (!this._single) {
                if (rem === 0){
                    if (this._pointerY == 0){
                        this._pointerY = 1;
                        this._pointerX = this._pointerX - 5;
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
            box.css('-webkit-transform', 'translate3d(' + pos.x + 'px, ' + pos.y + 'px, 0px)');
        
            this._pointerX++;
            return this;
        }
    });

    window.Slider = Slider; 

}).call(this);
