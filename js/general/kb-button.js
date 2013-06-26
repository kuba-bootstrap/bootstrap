(function(){
	'use strict';

	// Buttons
	$('.btn').on(downEvent, function(){
		$(this).addClass('hvr');
	}).on(upEvent, function(){
		$(this).removeClass('hvr');
	});

	// Toggles
	$('.tog').on(downEvent, function(){
		$(this).toggleClass('on');
	});

})();