(function(){
	/*
	 * Implementation
	 */

	/*
	 * Simulation
	 */

	// Page transition simulation

	transition.register(['page_1', 'page_2', 'page_3'], 'set_1');
	transition.register(['page_3', 'page_4', 'page_5'], 'set_2');

	// Fade

	$(document.getElementById('fadeNext')).on(upEvent, function(){
		transition.fadeNext('set_1');
	});
	$(document.getElementById('fadeBack')).on(upEvent, function(){
		transition.fadeBack('set_1');
	});
	$(document.getElementById('fadeToLast')).on(upEvent, function(){
		transition.fadeTo('set_1', 'page_3');
	});
	$(document.getElementById('fadeNext_2')).on(upEvent, function(){
		transition.fadeNext('set_1');
	});
	$(document.getElementById('fadeBack_2')).on(upEvent, function(){
		transition.fadeBack('set_1');
	});
	$(document.getElementById('fadeToFirst')).on(upEvent, function(){
		transition.fadeTo('set_1', 'page_1');
	});

	// Slide
	$(document.getElementById('slideNext')).on(upEvent, function(){
		transition.slideNext('set_1');
	});
	$(document.getElementById('slideBack')).on(upEvent, function(){
		transition.slideBack('set_1');
	});
	$(document.getElementById('slideToLast')).on(upEvent, function(){
		transition.slideTo('set_1', 'page_3');
	});
	$(document.getElementById('slideNext_2')).on(upEvent, function(){
		transition.slideNext('set_1');
	});
	$(document.getElementById('slideBack_2')).on(upEvent, function(){
		transition.slideBack('set_1');
	});
	$(document.getElementById('slideToFirst')).on(upEvent, function(){
		transition.slideTo('set_1', 'page_1');
	});

	// Flip
	$(document.getElementById('flipNext')).on(upEvent, function(){
		transition.flipNext('set_1');
	});
	$(document.getElementById('flipBack')).on(upEvent, function(){
		transition.flipBack('set_1');
	});
	$(document.getElementById('flipToLast')).on(upEvent, function(){
		transition.flipTo('set_1', 'page_3');
	});
	$(document.getElementById('flipNext_2')).on(upEvent, function(){
		transition.flipNext('set_1');
	});
	$(document.getElementById('flipBack_2')).on(upEvent, function(){
		transition.flipBack('set_1');
	});
	$(document.getElementById('flipToFirst')).on(upEvent, function(){
		transition.flipTo('set_1', 'page_1');
	});

})();

