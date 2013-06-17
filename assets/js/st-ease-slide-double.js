(function(){

	$.extend($.fn, {
		easeBoxDouble: function(){
			var args = arguments[0] || { boxes: [], left:10, offset: 10, scrollParent: undefined, force: 4, width: 200 },
				data = this.data(),
				startX = 0,
				split = 0,
            	startTime = 0,
            	on = "ontouchend" in window,
            	startEvent = (on) ? 'touchstart' : 'mousedown',
            	moveEvent = (on) ? 'touchmove' : 'mousemove',
            	stopEvent = (on) ? 'touchend' : 'mouseup',
            	self = this;

            data.scrollParent = args.scrollParent;
            data.scrollWidth = $(window).width(),
            data.width = args.width;
            data.left = args.left;
            data.offset = args.offset;
            data.force = args.force;
			data.boxes = [];
			data.pointer = 0;

			for(var i = 0; i < args.boxes.length; i++){
				data.boxes.push(document.getElementById(args.boxes[i]));
			}

			data.boxWidth = $(data.boxes[0]).width() + parseInt($(data.boxes[0]).css('padding-left')) + parseInt($(data.boxes[0]).css('padding-right'));

			this.on(startEvent, function(e){

					console.log('start');

					startTime = e.timeStamp;
                	startX = e.originalEvent.touches ? e.originalEvent.touches[0].pageX : e.pageX;
                	self.on(moveEvent, function(e){
                		var currentX = e.originalEvent.touches ? e.originalEvent.touches[0].pageX : e.pageX,
                			l = 0,
                			r = 0;
                			
                		split = currentX - startX;
                		startX = startX + split;

                		//console.log(data.all, '>', data.scrollWidth);
                		//console.log(data);

                		if(data.all > data.scrollWidth){

                			for(var i = 0; i < data.boxes.length; i++){ 
                				var pos = $(data.boxes[i]).removeClass('fx').css("-webkit-transform"),
                					boo = pos.split(','),
                					poo = parseFloat(boo[4]),
                					foo = split + poo; 

                				l = (data.boxWidth + data.offset) * i + data.left;
                				r = (((data.boxWidth * data.boxes.length) - ((data.boxWidth + data.offset) * i) - data.scrollWidth) * -1) - (data.left * data.boxes.length);

                				if(foo < l && foo > r){

                					$(data.boxes[i]).css("-webkit-transform", "translate3d(" + foo + "px, " + 0 + "px, " + 0+ "px)");
                				}
                			}
                		}
                	});
				})
				.on(stopEvent, function(e){

					// use the force young skywalker

					var l = 0,
						r = 0;

					if(data.all > data.scrollWidth){
						for(var i = 0; i < data.boxes.length; i++){
							var pos = $(data.boxes[i]).css("-webkit-transform"),
                				boo = pos.split(','),
                				poo = parseFloat(boo[4]),
                				foo = (split * data.force) + poo;

                			l = (data.boxWidth + data.offset) * i + data.left;
                			r = (((data.boxWidth * data.boxes.length) - ((data.boxWidth + data.offset) * i) - data.scrollWidth) * -1) - (data.left * data.boxes.length);

                			if(foo >= l){
								foo = l;
							}
							if(foo <= r){
								foo = r;
							}

							$(data.boxes[i]).addClass('fx').css("-webkit-transform", "translate3d(" + foo + "px, " + 0 + "px, " + 0 + "px)");
						}
					}
					startTime = 0;
					startX = 0;

					self.off(moveEvent);
				});

			//this.initialize();
		},
		initialize: function(){
			var data = this.data(),
				d = 0,
				t = 0;
			
			data.scrollWidth = ((data.scrollParent == undefined) ? $(window).width() : data.scrollParent.width());
			data.all = (data.boxWidth * (data.boxes.length - 1)) + (data.offset * (data.boxes.length - 1)) + data.offset;

			//console.log('all: ', data.all);

			if(data.boxes != null && data.array != 0){
				for(var i = 0; i < data.boxes.length; i++){
					var obj = $(data.boxes[i]);

					if(0 == parseInt(i / 5 % 2)){
						t = 0;
					} else {
						t = 300;
					}

					console.log('i', i);
					console.log('t', t);

					d = (data.boxWidth + data.offset) * i + data.left;

					$(data.boxes[i]).css("-webkit-transform", "translate3d(" + d + "px, " + t + "px, " + 0 + "px)");
				}
			}
		},
		addEaseBoxDouble: function(box){
			var data = this.data(),
				d = 0,
				t = 0,
				boxes = data.boxes.length,
				rem = boxes % 6,
				rem2 = 6 % boxes;

			data.boxes.push(box);

			// todo: fix this
			if(data.width != null){
				data.boxWidth = data.width;
			}else if(!data.boxWidth){
				data.boxWidth = $(data.boxes[0]).width() + parseInt($(data.boxes[0]).css('padding-left')) + parseInt($(data.boxes[0]).css('padding-right'));
			}

			//console.log('boxes', boxes);
			//console.log('rem', rem);
			//console.log('rem 2', rem2);
			//console.log('ex 1', boxes % 2);
			console.log('ex 2', parseInt(boxes / 5 % 2));

			if(0 == parseInt(boxes / 5 % 2)){
				t = 0;
			} else {
				t = 300;
			}

			//boxes = rem;
			d = (data.boxWidth * (boxes - 1)) + (data.offset * (boxes - 1)) + data.offset;

			//console.log(t, d);

			//}else{
				//d = (data.boxWidth * (boxes - 1)) + (data.offset * (boxes - 1)) + data.offset;
			//}

			$(data.boxes[data.boxes.length - 1]).css("-webkit-transform", "translate3d(" + d + "px, " + t + "px, " + 0 + "px)");
		}
	});
})();