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
        className: function(){
        	var options = this.options || {};

        	this.is_single_shelf = options.is_single_shelf || false;

        	if(this.is_single_shelf == false){
                return 'box-con main double';
            } else {
                return 'box-con main single';
            }
        },
        shelfInitialize: function(options) {
            var options = this.options || {};

            this.sub_view = options.sub_view;
            this.model = options.model;
            this.parent = options.parent;
            this.properties = options.properties;

            if(this.collection){
	            this.listenTo(this.collection, 'add', this.addItem);
	            this.listenTo(this.collection, 'remove', this.resetItems);
	            this.listenTo(this.collection, 'reset', this.resetItems);
	            this.listenTo(this.collection, 'sort', this.resetItems);
	        }

	        if(this.model){
	        	this.listenTo(this.model, 'loadedMainModel', this.resetItems);
            	this.listenTo(this.model, 'page-render', this.resize);
	        }

            this.ITEMS = [];
            this.flag = false;
    	},
    	determineVisibleTiles: function(){
    		var split = 1;

            if(this.is_single_shelf == false){
               split = 2
            }

            this.proportion();

            var maxWidth = $(window).width(),
                possible = (maxWidth - 76 + 34) / (this._box_size.width + 6 + 34);

            return parseInt(possible) * split;
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
	                    var view = new self.sub_view({ model: self.collection.models[i] }),
	                        rendered = view.render().el;

	                    if(this.options.properties.singleShelf == false){
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
    	},
    	proportion: function(){
    		var originalHeight = 200,
                conHeight = ($(window).height() - $('#logoDiv').height() - 20) / 2, //151
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

                if(self.INDEX > 0){
                    self.INDEX = self.INDEX - possibleItems;
                    self.resize( self.INDEX, 'left');
                }
            };

            function left(){
                var possibleItems = self.determineVisibleTiles();

                if((self.INDEX + possibleItems) < self.collection.models.length){
                    self.INDEX = self.INDEX + possibleItems;
                    self.resize(this.INDEX, 'right');
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

            if(this.INDEX > 0){
                if(typeof cvox !== 'undefined' && cvox.Api){
                    cvox.Api.speak('Moving to the previous shelf.', 0, '');
                }
                this.INDEX = this.INDEX - possibleItems;
                this.resize(this.INDEX, 'left');

                this.$('.ease-box').width(this.boxSize.width);
                this.$('.ease-box').height(this.boxSize.height);
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

            if((this.INDEX + possibleItems) < this.collection.models.length){
                if(typeof cvox !== 'undefined' && cvox.Api){
                    cvox.Api.speak('Moving to the next shelf.', 0, '');
                }
                this.INDEX = this.INDEX + possibleItems;
                this.resize(this.INDEX, 'right');

                this.$('.ease-box').width(this.boxSize.width);
                this.$('.ease-box').height(this.boxSize.height);
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