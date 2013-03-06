(function(){

	// Touch selectors
	$('.mn').on(upEvent, function(){
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
		register: function(){

			console.log(items);
		},
		addItem: function(){
			console.log('add');
		}
	});

})();