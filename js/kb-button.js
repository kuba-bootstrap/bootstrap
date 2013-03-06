(function(){

    // Hover extension for tablets 
    // TODO: determine if individual buttons should be extended separately or
    // if extended by class - test whats more efficient

	$('.btn').on(downEvent, function(){
		$(this).addClass('btn-hvr');
	}).on(upEvent, function(){
		$(this).removeClass('btn-hvr');
	});

	$('.tog').on(downEvent, function(){
		$(this).toggleClass('tog-on');
	});

})();