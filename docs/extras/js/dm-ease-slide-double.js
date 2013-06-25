(function(){

	/*
	 * Simulation
	 */

	// Setup empty box

	$(document.getElementById('box_2')).easeBoxDouble({
		boxes: [],
		left: 25,
		offsetX: 25,
		offsetY: 300,
		scrollSurface: 'box_3',
		force: 4,
		single: false
	});

	// add box every 3 sec

	var speed = 200
		count = 0,
		timer = setInterval(addBox, speed);

	$('#stop').click(function(){
		clearInterval(timer);
		console.log('stop');
	});
	$('#go').click(function(){
		timer = setInterval(addBox, speed);
		console.log('go');
	});
	$('#initialize').click(function(){
		$(document.getElementById('box_2')).initializeDouble();
	});

	function addBox(){
		var box = $('<div class="ease-box-double" id="' + 'dyn_' + count + '">' + count + '</div>');
		count++;

		$('#box_3').append(box);
		$(document.getElementById('box_2')).addEaseBoxDouble(box);
	}
	
})();