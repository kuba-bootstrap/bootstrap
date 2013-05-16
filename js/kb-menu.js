(function(){
	"use strict";

	// Touch selectors
	$('.mn').on(upEvent, function(){

		console.log('on menu');

		$('.mn').removeClass('mn-on');
		$(this).toggleClass('mn-on');
		
		$(window).on(upEvent, function(e){
			if(e.target.nodeName != 'BUTTON'){
				$(this).off(upEvent);
				$('.mn').removeClass('mn-on');
			}
		});
	});
	
	// Menu Build
	var items = [];

	$.extend($.fn, {
		menu: function(){
			var args = arguments[0] || { items: [] };

			console.log('menu');

			for(var i = 0; i < args.items.length; i++){
				
				var corner = 'btn-mid';
	
				if(i == 0){
					corner = 'btn-lef';
				}else if(i == (args.items.length - 1)){
					corner = 'btn-rig';
				}
	
				var item = $('<div class="mn"><button class="btn ' + corner + '">' + args.items[i][0] + '</button></div>');
				var fn = args.items[i][1];
	
				this.append(item);
	
				if(fn != null){
				item.bind(downEvent, function(e){
						$(this).addClass('mn-on');
					}).bind(upEvent, function(e){
						$(this).removeClass('mn-on');
					}).bind(upEvent, function(func){
						return func;
					}(fn));
				}
			};
		},
		registerMenu: function(button, type, target){

			var obj = '';

			switch(type){
				case 'class':
					obj = $('.' + button);
					break;
				case 'id':
					obj = $('#' + button);
					break;
				case 'cache':
					obj = button;
					break;
			}

			obj.on(upEvent, function(){ // todo: change display/hide on the .mn selector
		
				$('.dd-on').removeClass('dd-on');

				$('#' + target).toggleClass('dd-on');
				
				$(window).on(upEvent, function(e){
					if(e.target.nodeName != 'BUTTON'){
						$(this).off(upEvent);
						$('#' + target).removeClass('dd-on');
					}
				});
			});
		},
		addMenuItem: function(){
			console.log('add');
		}
	});

})();