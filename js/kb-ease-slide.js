(function(){

	$.extend($.fn, {
		easeBox: function(){
			var args = arguments[0] || { boxes: [], array: 2 },
				data = this.data();

			data.boxes = [];
			data.array = args.array;
			data.pointer = 0;

			for(var i = 0; i < args.boxes.length; i++){
				data.boxes.push(document.getElementById(args.boxes[i]));
			}

			var startX = 0,
            	startTime = 0,
            	on = "ontouchend" in window,
            	startEvent = (on) ? 'touchstart' : 'mousedown',
            	moveEvent = (on) ? 'touchmove' : 'mousemove',
            	stopEvent = (on) ? 'touchend' : 'mouseup';

			this.on(startEvent, function(e){

				})
				.on(stopEvent, function(e){

				})
				.on(moveEvent, function(e){

				})

			this.initialize();
		},
		initialize: function(){
			var data = this.data();

			if(data.boxes != null && data.array != 0){
				
				var split = 100 / data.array;

				for(var i = 0; i < data.array; i++){
					$(data.boxes[i]).css('left', ((i + 1) * split) + '%');
				}
			}
		},
		addEaseBox: function(box){
			var data = this.data();

			data.boxes.push(box);
			if(data.pointer == 0){
				console.log('addBox: init');
				this.initialize();
			}
		},
		moveEaseBox: function(direction){
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