(function(){

	/*
	 * Simulation
	 */

	// Setup empty box

	$(document.getElementById('dyn_2')).easeBoxDouble({
		boxes: [],
		left: 25,
		offset: 25,
		force: 4
	});

	// add box every 3 sec

	var speed = 200
		count = 0,
		timer = setInterval(addBox, speed);

	$('#stop').click(function(){
		clearInterval(timer);
		console.log('stop');
		$(document.getElementById('dyn_2')).initialize();
	});
	$('#go').click(function(){
		timer = setInterval(addBox, speed);
		console.log('go');
	});

	function addBox(){
		var box = $('<div class="ease-box-double" id="' + 'dyn_' + count + '">' + count + '</div>');
		count++;

		$('#dyn_2').append(box);
		//console.log('add box', box);

		$(document.getElementById('dyn_2')).addEaseBoxDouble(box);
		//$(document.getElementById('dyn_2')).initialize();
	}
	
})();