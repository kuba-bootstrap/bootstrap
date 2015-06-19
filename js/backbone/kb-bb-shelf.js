(function(){
    
    var Shelf = function(options) {
        Backbone.View.call(this, options);
    	this.shelfInitialize(options);
  	};

    var root = this;
    root.kb = root.kb || {};
    root.kb.Shelf = Shelf;

  	Shelf.extend = Backbone.View.extend;

  	_.extend(Shelf.prototype, Backbone.View.prototype, {
  		_index: 0,
  		_box_size: { width:0, height:0 },
        _gap: 0,
        className: function(){
        	var options = this.options || {};

        	this.is_single_shelf = options.is_single_shelf || false;
            this.custom_css = options.custom_css || false;

            if(this.custom_css){
                return this.custom_css;
        	} else if(this.is_single_shelf){
                return 'box-con main single';
            } else {
                return 'box-con main double';
            }
        },
        shelfInitialize: function(options) {
            var options = this.options || {};

            this.sub_view = options.sub_view;
            this.model = options.model;
            this.parent = options.parent;
            this.portal_id = options.portal_id || false;

            if(this.collection){
	            this.listenTo(this.collection, 'add', this.addItem);
	            this.listenTo(this.collection, 'remove', this.resetItems);
	            this.listenTo(this.collection, 'reset', this.resetItems);
	            this.listenTo(this.collection, 'sort', this.resetItems);
	        }

	        // if(this.model){
	        // 	this.listenTo(this.model, 'loadedMainModel', this.resetItems);
         //    	this.listenTo(this.model, 'page-render', this.resize);
	        // }

            this.ITEMS = [];
    	},
    	determineVisibleTiles: function(){
    		var split = 1,
                exact_possible = 0;

            if(this.is_single_shelf == false){
               split = 2
            }

            this.proportion();

            var maxWidth = $(window).width(),
                possible = (maxWidth - 76 + 20) / (this._box_size.width + 6 + 20);

            exact_possible = parseInt(possible) * split;

            _gap = 20 + (((possible % 1) * (this._box_size.width + 20)) / ((exact_possible / split) - 1));

            return exact_possible;
    	},
    	placeTiles: function(possibleItems, index, direction){
    		if(direction == 'left'){
                direction = -1;
            } else if(direction == 'right') {
                direction = 1;
            } else {
                direction = 0;
            }

            var self = this,
                conId = 'shelf-slide-' + Math.floor((Math.random() * 10000) + 1),
                previousConId = this.ITEMS;
                slideContainer = '<div id="' + conId + '" class="fx-fs" style="position:absolute; top:0; transform: translate3d(' + (direction * $(window).width()) + 'px, 0px, 0px); -webkit-transform: translate3d(' + (direction * $(window).width()) + 'px, 0px, 0px);"></div>';

            self.$('.con-slide-static').prepend(slideContainer);

            if(this.is_single_shelf == false){
                var split = '<div class="one" id="' + conId + '-1' + '"></div><div class="two" style="top: ' + this._box_size.y + 'px" id="' + conId + '-2' + '"></div>';

                self.$('#' + conId).append(split);
            }

            // clean first
            $(previousConId).css({
                'transform': 'translate3d(' + ($(window).width() * (direction * -1)) + 'px, 0px, 0px)',
                '-webkit-transform': 'translate3d(' + ($(window).width() * (direction * -1)) + 'px, 0px, 0px)'
            });

            if(direction == 0){
                $(previousConId).remove();
            } else {
                setTimeout(function(){
                    $(previousConId).remove();

                    $(self.$el).find('.ease-box:first img').focus();

                    $(self.$el).keydown(function(e){
                        self.keys(e);
                    });
                }, 1000);
            }

            // add new container
            this.ITEMS = '#' + conId;

            if(self.collection){
	            for(var i = index; i < (possibleItems + index); i++){
	                if(self.collection.models[i]){

                        var gap = _gap;

                        if(i == (possibleItems + index - 1)){
                            gap = 0;
                        }

	                    var view = new self.sub_view({ model: self.collection.models[i], portal_id: this.portal_id, gap: gap }),
	                        rendered = view.render().el;

	                    if(this.is_single_shelf == false){
	                        if(i % 2 == 0){
	                            self.$('#' + conId + '-1').append($(rendered));
	                        } else {
	                            self.$('#' + conId + '-2').append($(rendered));
	                        }
	                    } else {
	                        self.$('#' + conId).append($(rendered));
	                    }
	                }
	            };
	        }

            $(this.ITEMS).css({
                'transform': 'translate3d(0px, 0px, 0px)',
                '-webkit-transform': 'translate3d(0px, 0px, 0px)'
            });
    	},
    	resize: function(index, direction){
    		var possibleItems = this.determineVisibleTiles();

            if(!index){
                index = this._index;
            }

            // change index so return position will be 0
            var check = index % possibleItems;

            this._index = index = index - check;
            this.placeTiles(possibleItems, index, direction);

            this.$('.con-slide-static .ease-box').height(this._box_size.height);
            this.$('.con-slide-static .ease-box').width(this._box_size.width);

            if(possibleItems > this.collection.models.length){
                this.$('.shelf-left').removeClass('on');
                this.$('.shelf-right').removeClass('on');
            } else {
                if(this._index > 0){
                    this.$('.shelf-left').addClass('on');
                } else { 
                    this.$('.shelf-left').removeClass('on');
                }

                if((this._index + possibleItems) < this.collection.models.length){
                    this.$('.shelf-right').addClass('on');
                } else {
                    this.$('.shelf-right').removeClass('on');
                }
            }

    	},
    	proportion: function(){
    		var originalHeight = 200,
                conHeight = ($(window).height() - $('#logoDiv').height() - 20) / 2,
                proportion = originalHeight / (conHeight - 65);

            if(conHeight < 270){
                if(this.is_single_shelf == true){
                    $('.box-con.main.single').height(conHeight);
                }

                this._box_size.y = conHeight;
                this._box_size.height = conHeight - 65;
                this._box_size.width = 140 / proportion;
            } else {
                if(this.is_single_shelf == true){
                    $('.box-con.main.single').height(270);
                }

                this._box_size.y = 270;
                this._box_size.height = 200;
                this._box_size.width = 140;
            }
    	},
    	registerMouse: function(){
            var self = this;

            function right(){
                var possibleItems = self.determineVisibleTiles();

                if(self._index > 0){
                    self._index = self._index - possibleItems;
                    self.resize( self._index, 'left');
                }
            };

            function left(){
                var possibleItems = self.determineVisibleTiles();

                if((self._index + possibleItems) < self.collection.models.length){
                    self._index = self._index + possibleItems;
                    self.resize(this._index, 'right');
                }
            };

            $(this.$el).swipe({
                swipeTime: 1000,
                swipeX: 50,
                left: left,
                right: right
            });

        },
    	clickLeft: function(){
    		var possibleItems = this.determineVisibleTiles(),
                self = this;

            if(this._index > 0){
                if(typeof cvox !== 'undefined' && cvox.Api){
                    cvox.Api.speak('Moving to the previous shelf.', 0, '');
                }
                this._index = this._index - possibleItems;
                this.resize(this._index, 'left');

                this.$('.ease-box').width(this._box_size.width);
                this.$('.ease-box').height(this._box_size.height);
            } else {
                if(typeof cvox !== 'undefined' && cvox.Api){
                    cvox.Api.speak('Reached the beginning of the shelf.', 0, '');
                }
                $(self.$el).keydown(function(e){
                    self.keys(e);
                });
            }
    	},
    	clickRight: function(){
    		var possibleItems = this.determineVisibleTiles(),
                self = this;

            if((this._index + possibleItems) < this.collection.models.length){
                if(typeof cvox !== 'undefined' && cvox.Api){
                    cvox.Api.speak('Moving to the next shelf.', 0, '');
                }
                this._index = this._index + possibleItems;
                this.resize(this._index, 'right');

                this.$('.ease-box').width(this._box_size.width);
                this.$('.ease-box').height(this._box_size.height);
            } else {
                if(typeof cvox !== 'undefined' && cvox.Api){
                    cvox.Api.speak('Reached the end of the shelf.', 0, '');
                }
                $(self.$el).keydown(function(e){
                    self.keys(e);
                });
            }
    	},
    	addItem: function(){
    		var possibleItems = this.determineVisibleTiles();

            this.placeTiles(possibleItems, this._index_, 'right');
    	},
    	resetItems: function(){
    		this._index = 0;
            this.resize();
    	}
  	});

  	window.Shelf = Shelf;

})();