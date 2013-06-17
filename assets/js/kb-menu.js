(function(){
	'use strict';

	// Touch selectors
	$('.mn').on(upEvent, function(){
		$('.mn').removeClass('on');
		$(this).toggleClass('on');
		
		$(window).on(upEvent, function(e){
			if(e.target.nodeName != 'BUTTON'){
				$(this).off(upEvent);
				$('.mn').removeClass('on');
			}
		});
	});
	
	// Menu Build
	var items = [];

	$.extend($.fn, {
		menu: function(){
			var args = arguments[0] || { items: [], itemCSS: '', corners: true, first: true };

			// handle item CSS when not declared vs declared 
			if(args.itemCSS == undefined){
				args.itemCSS = '';
			} else { 
				args.itemCSS = ' ' + args.itemCSS;
			}

			for(var i = 0; i < args.items.length; i++){
				
				var corner = 'btn-mid',
					first = '';

				if(args.corners == true){
					if(i == 0){
						corner = 'btn-lef';
					}else if(i == (args.items.length - 1)){
						corner = 'btn-rig';
					}
				}

				if(args.first == true && i == 0){
					first = ' on';
				}
	
				var item = $('<div class="mn' + args.itemCSS + first + '"><button class="btn ' + corner + '">' + args.items[i][0] + '</button></div>');
				var fn = args.items[i][1];
	
				this.append(item);
	
				if(fn != null){
					item.bind(downEvent, function(e){
						$(this).addClass('on');
					}).bind(upEvent, function(e){
						$('.mn').removeClass('on');
						$(this).addClass('on');
					}).bind(upEvent, function(func){
						return func;
					}(fn));
				}
			};
		},
		registerMenu: function(button, type, target, excluded){

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

				if(!excluded) excluded = 'x';
				
				$(window).on(upEvent, function(e){
					if(e.target.nodeName != 'BUTTON'){
						if(!e.target.className.match(excluded)){
							$(this).off(upEvent);
							$('#' + target).removeClass('dd-on');
						}
					}
				});
			});
		},
		addMenuItem: function(){
			console.log('add');
		}
	});

})();