(function(){
	"use strict";

	$.fn.swipe = function(){
		var args = arguments[0] || { swipeTime: 900, swipeX: 200, left: left, right: right };

        var startX = 0,
            startTime = 0,
            on = "ontouchend" in window,
            startEvent = (on) ? 'touchstart' : 'mousedown',
            moveEvent = (on) ? 'touchmove' : 'mousemove',
            stopEvent = (on) ? 'touchend' : 'mouseup';

        this.bind(startEvent, function(e){
                startTime = e.timeStamp;
                startX = e.originalEvent.touches ? e.originalEvent.touches[0].pageX : e.pageX;
            })
            .bind(stopEvent, function(e){
                startTime = 0;
                startX = 0;
            })
            .bind(moveEvent, function(e){
                var currentX = e.originalEvent.touches ? e.originalEvent.touches[0].pageX : e.pageX,
                    currentDistance = (startX === 0) ? 0 : Math.abs(currentX - startX),
                    currentTime = e.timeStamp;
                if (startTime !== 0 && currentTime - startTime < args.swipeTime && currentDistance > args.swipeX) {
                    if (currentX < startX) {
                        e.preventDefault();
                        args.left();
                    }
                    if (currentX > startX) {
                        e.preventDefault();
                        args.right();
                    }
                    startTime = 0;
                    startX = 0;
                }
        	});

	};

	function left(){
		console.log('swipe left');
	}

	function right(){
		console.log('swipe right');
	}
})();