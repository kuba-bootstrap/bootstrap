(function(){
	'use strict';

	$.extend($.fn, {
		navigation: function(){
			var args = arguments[0] || { itemFn: [], offset: 0 },
				data = this.data(),
				self = this;

			data.items = args.itemFn;
			data.offset = args.offset;

			$(this).find('li').each(function(i){
				$(this).on(downEvent, function(){

					if(data.items[i]){

						$(self).find('li').removeClass('on');
						$(this).addClass('on');

						if(data.items[i].indexOf('#') !== -1){
							var offset = (data.offset != undefined)? data.offset : 0;

							$('body').animate({scrollTop: ($(data.items[i]).position().top + offset)});
							console.log(data.items[i], $(data.items[i]).position().top);
						} else { 
							data.items[i]();
						}

					}
				});
			});
		}
	});

})();