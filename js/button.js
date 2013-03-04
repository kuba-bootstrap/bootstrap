(function(downEvent, upEvent){

    // Hover extension for tablets 
    // TODO: determine if individual buttons should be extended separately or
    // if extended by class - test whats more efficient

	$('.btn').bind(downEvent, function(e){
		$(this).addClass('btn-hvr');
	}).bind(upEvent, function(e){
		$(this).removeClass('btn-hvr');
	});
})(downEvent, upEvent);