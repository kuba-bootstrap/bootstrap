(function(){
	$.extend($.fn, {
		modal: function(){

		var args = arguments[0] || { close: true  };

		var self = $(this),
			close = $('<button class="mdl-cls" id="closeModal">x</button>');

		if($('#modal').length == 0){
			$('body').append('<div class="mdl-bck" id="modal"></div>');
		}	

		if($('#closeModal').length == 0 && args.close == true){
			$(this).append(close);
		}

		// TODO: create some interesting animation

		$('#modal').show();
		$(this).show();

		close.on(upEvent, function(){
			self.closeModal();
		});
		},
		closeModal: function(){
			$(this).hide();
			$('#modal').hide();
			$('#closeModal').remove();
		}
	});
})();