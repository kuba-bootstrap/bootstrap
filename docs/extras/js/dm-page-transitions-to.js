(function(){
	/*
	 * Implementation
	 */

	/*
	 * Simulation
	 */

	// Page transition simulation

	transition.register('set_1', ['page_1', 'page_2', 'page_3', 'page_4']);

	// Slide

	$(document.getElementById('to_page_3')).on(upEvent, function(){
		transition.slideTo('set_1', 'page_3');
	});
	$(document.getElementById('to_page_4')).on(upEvent, function(){
		transition.slideTo('set_1', 'page_4');
	});
	$(document.getElementById('to_page_4_2')).on(upEvent, function(){
		transition.slideTo('set_1', 'page_4');
	});
	$(document.getElementById('to_page_1')).on(upEvent, function(){
		transition.slideTo('set_1', 'page_1');
	});
	$(document.getElementById('to_page_4_3')).on(upEvent, function(){
		transition.slideTo('set_1', 'page_4');
	});
	$(document.getElementById('to_page_2')).on(upEvent, function(){
		transition.slideTo('set_1', 'page_2');
	});
	$(document.getElementById('to_page_1_2')).on(upEvent, function(){
		transition.slideTo('set_1', 'page_1');
	});
	$(document.getElementById('to_page_3_2')).on(upEvent, function(){
		transition.slideTo('set_1', 'page_3');
	});

})();