$(function(){
	/*
	 * Implementation
	 */

	// Main Menu
	$(document.getElementById('mainMenu')).menu({
		items: [['Home', toHome], ['Get Started', toGetStarted], ['Components', toComponents]]
	});
	
	$(document.getElementById('mainMenu')).register();

	function toHome(){
		$('body').animate({scrollTop: 0});
	}
	function toGetStarted(){
		$('body').animate({scrollTop: $(document.getElementById('getStarted')).position().top});
	}
	function toComponents(){
		$('body').animate({scrollTop: $(document.getElementById('components')).position().top});
	}

	/*
	 * Simulation
	 */

	// Progress bar simulation

	$(document.getElementById('moveProgressBar')).bind(upEvent, function(){

		var w1 = Math.floor(Math.random()*100),
			w2 = Math.floor(Math.random()*100),
			w3 = Math.floor(Math.random()*100);

		$(document.getElementById('progressBar1')).css('width', w1 + '%');
		$(document.getElementById('progressBar2')).css('width', w2 + '%');
		$(document.getElementById('progressBar3')).css('width', w3 + '%');
	});

	// Box slide simulation

	$(document.getElementById('box')).box({
		boxes: ['box_1', 'box_2', 'box_3', 'box_4'],
		swipe: true,
		array: 2
	});

	$(document.getElementById('prev')).bind(upEvent, function(){
		$(document.getElementById('box')).moveLeft();
	});

	$(document.getElementById('next')).bind(upEvent, function(){
		$(document.getElementById('box')).moveRight();
	});

	// Menu simulation

	$(document.getElementById('menu')).menu({
		items: [['item 1', func1], ['item 2', func2], ['item 3', func3], ['item empty']]
	});

	function func1(){
		console.log('item 1 function fire!');
		alert('item 1 function fire!');
	}
	function func2(){
		console.log('item 2 function fire!');
		alert('item 2 function fire!');
	}
	function func3(){
		console.log('item 3 function fire!');
		alert('item 3 function fire!');
	}

	// Modal simulation

	$(document.getElementById('openModal')).on(upEvent, function(){
		$(document.getElementById('sampleModal')).modal();
	});
	$(document.getElementById('openModal2')).on(upEvent, function(){
		$(document.getElementById('sampleModal2')).modal({ close: false });
	});
	$(document.getElementById('sampleCloseModal')).on(upEvent, function(){
		$(document.getElementById('sampleModal2')).closeModal();
	});
});

