(function(){

	$.extend($.fn, {
		slideOver: function(){
			var args = arguments[0] || { main: '', trigger: '', direction: 'left' },
				data = this.data(),
				pagePos = 0;

			data.main = args.main;
			data.trigger = args.trigger;
			data.pagePos = args.pagePos;
			data.direction = args.direction;

			$('#' + trigger).on('click', function(){
				if(pagePos == 0 && direction == 'left'){
					pagePos = 80;
				} else if (pagePos == 0 && direction == 'right')
					pagePos = -80;
				} else {
					pagePos = 0;
				}
				$('#' + main).css('-webkit-transform', 'translate3d(' + pagePos + '%, 0px, 0px)');
			});
		}
	});

})();