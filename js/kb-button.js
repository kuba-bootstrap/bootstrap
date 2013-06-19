(function(){
	'use strict';

	$('.btn').on(downEvent, function(){
		$(this).addClass('hvr');
	}).on(upEvent, function(){
		$(this).removeClass('hvr');
	});

	$('.tog').on(downEvent, function(){
		$(this).toggleClass('on');
	});


})();