(function(){

	$.extend($.fn, {
		easeBox: function(){
			var args = arguments[0] || { boxes: [], left:10, offset: 10, force: 4 },
				data = this.data(),
				startX = 0,
				split = 0,
            	startTime = 0,
            	on = "ontouchend" in window,
            	startEvent = (on) ? 'touchstart' : 'mousedown',
            	moveEvent = (on) ? 'touchmove' : 'mousemove',
            	stopEvent = (on) ? 'touchend' : 'mouseup',
            	self = this;

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
					startTime = e.timeStamp;
                	startX = e.originalEvent.touches ? e.originalEvent.touches[0].pageX : e.pageX;
                	self.on(moveEvent, function(e){
                		var currentX = e.originalEvent.touches ? e.originalEvent.touches[0].pageX : e.pageX,
                			l = 0,
                			r = 0,
                			width = $(window).width();
                			
                		split = currentX - startX;
                		startX = startX + split;
               
                		for(var i = 0; i < data.boxes.length; i++){ 
                			var pos = $(data.boxes[i]).removeClass('fx').css("-webkit-transform"),
                				boo = pos.split(','),
                				poo = parseFloat(boo[4]),
                				foo = split + poo; 

                			l = (data.boxWidth + data.offset) * i + data.left;
                			r = (((data.boxWidth * data.boxes.length) - ((data.boxWidth + data.offset) * i) - width) * -1) - (data.left * data.boxes.length);

                			if(foo < l && foo > r){

                				$(data.boxes[i]).css("-webkit-transform", "translate3d(" + foo + "px, " + 0 + "px, " + 0+ "px)");
                			}
                		}
                	});
				})
				.on(stopEvent, function(e){

					// use the force young skywalker

					var l = 0,
						r = 0,
						width = $(window).width();

					for(var i = 0; i < data.boxes.length; i++){
						var pos = $(data.boxes[i]).css("-webkit-transform"),
                			boo = pos.split(','),
                			poo = parseFloat(boo[4]),
                			foo = (split * data.force) + poo;

                		l = (data.boxWidth + data.offset) * i + data.left;
                		r = (((data.boxWidth * data.boxes.length) - ((data.boxWidth + data.offset) * i) - width) * -1) - (data.left * data.boxes.length);

                		if(foo >= l){
							foo = l;
						}
						if(foo <= r){
							foo = r;
						}

						$(data.boxes[i]).addClass('fx').css("-webkit-transform", "translate3d(" + foo + "px, " + 0 + "px, " + 0 + "px)");
					}
					startTime = 0;
					startX = 0;

					self.off(moveEvent);
				});

			this.initialize();
		},
		initialize: function(){
			var data = this.data();
			
			if(data.boxes != null && data.array != 0){

				for(var i = 0; i < data.boxes.length; i++){
					var obj = $(data.boxes[i]);

					d = (data.boxWidth + data.offset) * i + data.left;

					$(data.boxes[i]).css("-webkit-transform", "translate3d(" + d + "px, " + 0 + "px, " + 0 + "px)");
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
		}
	});
})();