(function(){
	
	var items = [];

	$.extend($.fn, {
		menu: function(){
			var args = arguments[0] || { items: [] };

			for(var i = 0; i < args.items.length; i++){
				
				items = 'name';

				var corner = 'btn-mid';
	
				if(i == 0){
					corner = 'btn-lef';
				}else if(i == (args.items.length - 1)){
					corner = 'btn-rig';
				}
	
				var item = $('<button class="btn ' + corner + '">' + args.items[i][0] + '</button>');
				var fn = args.items[i][1];
	
				this.append(item);
	
				item.bind(downEvent, function(e){
						$(this).addClass('btn-hvr');
					}).bind(upEvent, function(e){
						$(this).removeClass('btn-hvr');
					}).bind(upEvent, function(func){
						return func;
					}(fn));
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