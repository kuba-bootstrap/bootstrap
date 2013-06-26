(function (){
	'use strict';

	$.extend($.fn, {
		box: function(){
			var args = arguments[0] || { boxes: [], swipe: false, array: 2 },
				data = this.data();

			data.boxes = [];
			data.swipe = args.swipe;
			data.array = args.array;
			data.pointer = 0;

			for(var i = 0; i < args.boxes.length; i++){
				data.boxes.push(document.getElementById(args.boxes[i]));
			}

			if(data.swipe == true){
				this.swipe({ 
					swipeTime: 1000, 
					swipeX: 50, 
					left: this.moveRight, 
					right: this.moveLeft, 
					leftProp: this, 
					rightProp: this 
				});
			}

			this.initialize();

			return this;
		},
		initialize: function(){
			var data = this.data();

			if(data.boxes != null && data.array != 0){
				
				var split = 100 / data.array;

				for(var i = 0; i < data.array; i++){
					$(data.boxes[i]).css('left', ((i + 1) * split) + '%');
				}
			}

			return this;
		},
		addBox: function(box){
			var data = this.data();

			data.boxes.push(box);
			if(data.pointer == 0){
				// console.log('addBox: init');
				this.initialize();
			}

			return this;
		},
		moveBox: function(direction){
			var data = this.data(),
				split = 100 / data.array; 

			if(direction == 'left'){
				if(data.pointer > 0){
					data.pointer--;
					for(var i = 0; i < (data.array + 1); i++){
						$(data.boxes[data.pointer + i- 1]).css('left', (i * split) + '%');
					}
				}
			}else if(direction == 'right' && data.boxes.length > 1){
				if(data.pointer < (data.boxes.length - data.array + 1)){
					for(var i = 0; i < data.array; i++){
						$(data.boxes[data.pointer + i]).css('left', (i * split) + '%');
					}
					data.pointer++;
				}
			}

			return this;
		},
		moveLeft: function(self){
			if(self != null){
				self.moveBox('left');
			}else{
				this.moveBox('left');
			}
		},
		moveRight: function(self){
			if(self != null){
				self.moveBox('right');
			}else{
				this.moveBox('right');
			}
		}
	});
})();
