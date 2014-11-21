(function (){
	'use strict';

    $.extend($.fn, {
        simpleCarousel: function(){

            var args = arguments[0] || { dots: [], slider: '', distance: 1, swipe: true },
                data = this.data(),
                self = this,
                limit = -1;

            data.dots = args.dots;
            data.slider = $(document.getElementById(args.slider));
            data.distance = args.distance;
            data.pointer = 0;

			for(var i = 0; i < args.dots.length; i++){
				var generateCallback = function(it) {
					return function(){
						self.simpleCarouselMove(args.dots[it], it);
					};
				}
				limit++;
				$('#' + args.dots[i]).on(upEvent, generateCallback(i));
			}

			function moveRight(){
				if(data.pointer < limit){
					data.pointer++;
					self.simpleCarouselMove(args.dots[data.pointer], data.pointer);
				}
			}

			function moveLeft(){
				if(data.pointer > 0){
					data.pointer--;
					self.simpleCarouselMove(args.dots[data.pointer], data.pointer);
				} 
			}

			if(args.swipe == true){
				data.slider.swipe({ 
					swipeTime: 1000, 
					swipeX: 50, 
					left: moveRight, 
					right: moveLeft
				});
			}

			return this;
        },
        simpleCarouselMove: function(dots, to){
        	var data = this.data(),
        		x = (to * data.distance) * -1;

        	for(var i = 0; i < data.dots.length; i++){
        		$('#' + data.dots[i]).removeClass('on');
        	}

        	$('#' + dots).addClass('on');
        	data.slider.css({
        		"-webkit-transform": "translate3d(" + x + "px, " + 0 + "px, " + 0 + "px)",
        		"-moz-transform": "translate3d(" + x + "px, " + 0 + "px, " + 0 + "px)",
        		"-ms-transform": "translate3d(" + x + "px, " + 0 + "px, " + 0 + "px)",
        	});

        	data.pointer = to;

        	return this;
        }
    });

})();