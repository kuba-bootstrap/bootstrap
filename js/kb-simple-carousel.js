(function (){
	"use strict";

    $.extend($.fn, {
        simpleCarousel: function(){

            var args = arguments[0] || { dots: [], slider: '', distance: 1 },
                data = this.data(),
                self = this;

            data.dots = args.dots;
            data.slider = $(document.getElementById(args.slider));
            data.distance = args.distance;
            data.pointer = 0;

			//initialize

			for(var i = 0; i < args.dots.length; i++){

				// data.slides.push({ dot: document.getElementById(args.dots[i]), distance: i });

				var generateCallback = function(it) {
					return function(){
						self.simpleCarouselMove(args.dots[it], it);
					};
				}

				$('#' + args.dots[i]).on(upEvent, generateCallback(i));
			}
        },
        simpleCarouselMove: function(dots, to){
        	var data = this.data(),
        		x = (to * data.distance) * -1;

        	for(var i = 0; i < data.dots.length; i++){
        		$('#' + data.dots[i]).removeClass('on');
        	}

        	$('#' + dots).addClass('on');

        	data.slider.css("-webkit-transform", "translate3d(" + x + "px, " + 0 + "px, " + 0 + "px)");
        }
    });

})();