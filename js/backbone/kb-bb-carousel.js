(function(){
    
    var Carousel = function(options) {
        Backbone.View.call(this, options);
    	this.carouselInitialize(options);
  	};

  	Carousel.extend = Backbone.View.extend;

  	_.extend(Carousel.prototype, Backbone.View.prototype, {
        className: 'cr',
        carouselInitialize: function(options) {
      	    this.carousel();
            this.setElement(this.el);
    	},
    	carousel: function(){
            var self = this,
                limit = -1;

            this.dots = this.options.dots || [];
            this.slider = $(this.options.slider);
            this.pointer = 0;
            this.distance = this.options.distance || 1;

            for(var i = 0; i < this.dots.length; i++){
                var generateCallback = function(it) {
                    return function(){
                        // console.log('hit');
                        self.moveCarousel(this.dots[it], it);
                    };
                }
                limit++;
                $(this.dots[i]).on(upEvent, generateCallback(i));

                // console.log(this.dots[i].length);
            }

    	},
        registerSwipe: function(){
            this.slider.swipe({ 
                swipeTime: 1000, 
                swipeX: 50, 
                left: moveRight, 
                right: moveLeft
            });
        },
        moveLeft: function(){
            console.log('moveLeft');

            var self = this;

            if(this.pointer > 0){
                this.pointer--;
                self.moveCarousel(this.dots[this.pointer], this.pointer);
            }
        },
        moveRight: function(){
            console.log('move right');

            var self = this;

            if(this.pointer < limit){
                this.pointer++;
                self.moveCarousel(this.dots[this.pointer], this.pointer);
            }
        },
        moveCarousel: function(dots, to){
            console.log('move');

            var x = (to * this.distance) * -1;

            for(var i = 0; i < this.dots.length; i++){
                $('#' + this.dots[i]).removeClass('on');
            }

            $('#' + dots).addClass('on');
            this.slider.css("-webkit-transform", "translate3d(" + x + "px, " + 0 + "px, " + 0 + "px)");

            this.pointer = to;
        }
  	});

  	window.Carousel = Carousel;

})();