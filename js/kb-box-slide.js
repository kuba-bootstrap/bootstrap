(function (){
	"use strict";

	var self, boxes = [], swipe, array, pointer, moveLeft, moveRight;

	$.extend($.fn, {
		box: function(){
			var args = arguments[0] || { boxes: [], swipe: false, array: 2 };
				self = $(this);

			console.log(self);

			// TODO: options should be stored with the main object so they are unique
			// per implementation.
			for(var i = 0; i < args.boxes.length; i++){
				boxes.push(document.getElementById(args.boxes[i]));
			}

			swipe = args.swipe;
			array = args.array;
			pointer = 0;

			if(swipe == true){
				this.swipe({ swipeTime: 1000, swipeX: 50, left: moveRight, right: moveLeft });
			}

			this.initialize();
		},
		initialize: function(){
			if(boxes != null && array != 0){
				
				var split = 100 / array;

				for(var i = 0; i < array; i++){
					$(boxes[i]).css('left', ((i + 1) * split) + '%');
				}
			}
		},
		moveBox: function(direction){
			var split = 100 / array; 

			if(direction == 'left'){
				if(pointer > 0){
					pointer--;
					for(var i = 0; i < (array + 1); i++){
						$(boxes[pointer + i- 1]).css('left', (i * split) + '%');
					}
				}
			}else if(direction == 'right' && boxes.length > 1){
				if(pointer < (boxes.length - array + 1)){
					for(var i = 0; i < array; i++){
						$(boxes[pointer + i]).css('left', (i * split) + '%');
					}
					pointer++;
				}
			}
		},
		moveRight: function(){
			this.moveBox('right');
		}
	});

	moveLeft = function(){
		self.moveBox('left');
	}

	moveRight = function(){
		self.moveBox('right');
	}
})();