(function(){

	$.extend($.fn, {
		easeBoxDouble: function(){
			var args = arguments[0] || { boxes: [], left:10, offsetX: 10, offsetY: 300, scrollParent: undefined, scrollSurface: undefined, force: 4, width: 200, single: true },
				data = this.data(),
				startX = 0,
				split = 0,
            	on = "ontouchend" in window,
            	startEvent = (on) ? 'touchstart' : 'mousedown',
            	moveEvent = (on) ? 'touchmove' : 'mousemove',
            	stopEvent = (on) ? 'touchend' : 'mouseup',
            	self = this;

            data.boxes = [];

            for(var i = 0; i < args.boxes.length; i++){
				data.boxes.push(document.getElementById(args.boxes[i]));
			}
            
            data.pointerX = 0;
            data.pointerY = 1;
          
          	data.scrollSurface = args.scrollSurface;
          	data.scrollSurfacePos = 0;
            data.scrollParent = args.scrollParent;
            data.scrollWidth = $(window).width(),
            data.width = args.width;
            data.left = args.left;
            data.offsetX = args.offsetX;
            data.offsetY = args.offsetY;
            data.force = args.force;
			data.boxesPos = [];
			data.boxWidth = $(data.boxes[0]).width() + parseInt($(data.boxes[0]).css('padding-left')) + parseInt($(data.boxes[0]).css('padding-right'));
			data.rightLimit = 0;
			data.single = args.single;
			data.lock = true;

			this.on(startEvent, function(e){

                	startX = e.originalEvent.touches ? e.originalEvent.touches[0].pageX : e.pageX;
                	
                	self.on(moveEvent, function(e){
                		var currentX = e.originalEvent.touches ? e.originalEvent.touches[0].pageX : e.pageX,
                			boxPos = 0;

                		console.log(data.lock);
                		if(data.lock == false){
                				
                			split = currentX - startX;
                			startX = startX + split;
                			boxPos = split + data.scrollSurfacePos;
	

                			$(data.scrollSurface).removeClass('fx').css("-webkit-transform", "translate3d(" + boxPos + "px, " + 0 + "px, " + 0 + "px)");
                			data.scrollSurfacePos = boxPos;		
                		}
                	});
				})
				.on(stopEvent, function(e){

					// use the force young skywalker

					console.log('force');

					if(data.lock == false){
						var boxPos = (split * data.force) + data.scrollSurfacePos;
	
						if(boxPos >= 0){
							boxPos = 0;
						}
						if(boxPos <= data.rightLimit){
							boxPos = data.rightLimit;
						}
	
						$(data.scrollSurface).addClass('fx').css("-webkit-transform", "translate3d(" + boxPos + "px, " + 0 + "px, " + 0 + "px)");
	
						data.scrollSurfacePos = boxPos;
					}
					split = 0;
					startX = 0;

					self.off(moveEvent);
				});
		},
		initializeDouble: function(){
			var data = this.data(),
				pos = {},
				length = 0,
				lock = 0;

			if(!data.scrollSurface.selector){
				data.scrollSurface = $('#' + data.scrollSurface);
			}

			data.scrollWidth = ((data.scrollParent == undefined) ? $(window).width() : data.scrollParent.width());
			data.all = (data.boxWidth * (data.boxes.length - 1)) + (data.offsetX * (data.boxes.length - 1)) + data.offsetX;

			if(data.boxes != null && data.array != 0){
				data.pointerX = 0;
				data.pointerY = 1;
				for(var i = 0; i < data.boxes.length; i++){
					var obj = $(data.boxes[i])

					this.calculatePosition(obj, i);
				}
			}

			if(data.single == false){
				length = ((data.boxes.length - (data.boxes.length % 2)) / 2) + (data.boxes.length % 5); // todo: fix this
				//length = (data.boxes.length % 10) - (data.boxes.length % 5) +  (Math.floor(data.boxes.length / 10)) * 5;
				//length = (Math.floor(data.boxes.length / 10) * 5) + (Math.ceil(data.boxes.length / 5) % 2) * (data.boxes.length % 5);


				console.log('array length', data.boxes.length);
				console.log('array % 10', (data.boxes.length % 10));
				console.log('array % 5', (data.boxes.length % 5));
				console.log(length);
			}else{ 
				length = data.boxes.length;
			}

			data.rightLimit = ((((data.boxWidth + data.offsetX) * length) + data.left) - data.scrollWidth) * -1;
			lock = ((data.boxWidth + data.offsetX) * length) + data.left;

			console.log(lock, '>', data.scrollWidth);

			if(lock > data.scrollWidth){
				data.lock = false;
			}else{
				data.lock = true;
			}
		},
		addEaseBoxDouble: function(box){
			var data = this.data(),
				pos = {},
				boxes = data.boxes.length;

			data.boxes.push(box);
			this.calculatePosition(boxes, data.boxes.length - 1);	
		},
		calculatePosition: function(box, index){
			var data = this.data(),
				pos = {},
				rem = index % 5;

			if(data.single == false){
				if(rem == 0){
					if(data.pointerY == 0){
						data.pointerY = 1;
						data.pointerX = data.pointerX - 5;
					}else{
						data.pointerY = 0;
					}
				}
			} else { 
				data.pointerY = 0;
			}

			data.boxWidth = $(data.boxes[0]).width() + parseInt($(data.boxes[0]).css('padding-left')) + parseInt($(data.boxes[0]).css('padding-right'));
			pos.x = (data.boxWidth * data.pointerX) + (data.offsetX * data.pointerX) + data.offsetX;
			pos.y = data.offsetY * data.pointerY;

			$(data.boxes[index]).css("-webkit-transform", "translate3d(" + pos.x + "px, " + pos.y + "px, " + 0 + "px)");
		
			data.boxesPos.push(pos);
			data.pointerX++;
		}
	});	
})();

