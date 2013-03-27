(function(){

	/*
	 * Simulation
	 */

	// Box slide simulation

	$(document.getElementById('box')).easeBox({
		boxes: ['box_1', 'box_2', 'box_3', 'box_4', 'box_5', 'box_6', 'box_7', 'box_8', 'box_9', 'box_10', 'box_11', 'box_12'],
		swipe: true,
		array: 8
	});

	$(document.getElementById('prev')).bind(upEvent, function(){
		$(document.getElementById('box')).moveLeft();
	});

	$(document.getElementById('next')).bind(upEvent, function(){
		$(document.getElementById('box')).moveRight();
	});

})();