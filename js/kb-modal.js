(function(){
	"use strict";
	
	$.extend($.fn, {
		modal: function(){

		var args = arguments[0] || { close: true  };

		var self = $(this),
			close = $('<button class="mdl-cls icon-remove" id="closeModal"></button>');

		if($('#modalBack').length == 0){

			console.log('modal back');

			$('body').append('<div class="mdl-bck" id="modalBack"></div>');
		}	

		if($('#closeModal').length == 0 && args.close == true){
			$(this).append(close);
		}

		// TODO: create some interesting animation

		$('#modalBack').show();
		$(this).show();

		close.on(upEvent, function(){
			self.closeModal();
		});
		},
		closeModal: function(){
			$(this).hide();
			$('#modalBack').hide();
			$('#closeModal').remove();
		}
	});
})();