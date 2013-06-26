(function(){
    
    var Carousel = function(options) {
        Backbone.View.call(this, options);
    	this.carouselInitialize(options);
  	};

  	Carousel.extend = Backbone.View.extend;

  	_.extend(Carousel.prototype, Backbone.View.prototype, {
        className: 'cr',
        carouselInitialize: function(options) {
            this.parentEl = this.options.parentEl || '#body';
      	    $(this.parentEl).append(this.render().el);
            this.carousel();
    	},
    	carousel: function(){
            var self = this,
                generateCallback = function(it) {
                    return function(){
                        self.moveCarousel(self.dots[it], it);
                    };
                };

            this.limit = -1;
            this.dots = this.options.dots || [];
            this.slider = $(this.options.slider);
            this.pointer = 0;
            this.distance = this.options.distance || 1;

            for(var i = 0; i < this.dots.length; i++){
                this.limit++;
                $(this.dots[i]).on(upEvent, generateCallback(i));
            }

            if(this.options.swipe == true) this.registerSwipe();

    	},
        registerSwipe: function(){
            var self = this;

            function moveRight(){
                if(self.pointer < self.limit){
                    self.pointer++;
                    self.moveCarousel(self.dots[self.pointer], self.pointer);
                }
            }

            function moveLeft(){
                if(self.pointer > 0){
                    self.pointer--;
                    self.moveCarousel(self.dots[self.pointer], self.pointer);
                } 
            }

            this.slider.swipe({ 
                swipeTime: 1000, 
                swipeX: 50, 
                left: moveRight, 
                right: moveLeft
            });
        },
        moveCarousel: function(dots, to){
            var x = (to * this.distance) * -1;

            for(var i = 0; i < this.dots.length; i++){
                $(this.dots[i]).removeClass('on');
            }

            $(dots).addClass('on');
            this.slider.css("-webkit-transform", "translate3d(" + x + "px, " + 0 + "px, " + 0 + "px)");

            this.pointer = to;
        }
  	});

  	window.Carousel = Carousel;

})();