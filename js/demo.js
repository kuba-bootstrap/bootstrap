$(function(){
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
		swipe: true
	});

	$(document.getElementById('prev')).bind(upEvent, function(){
		$(document.getElementById('box')).moveBox('left');
	});

	$(document.getElementById('next')).bind(upEvent, function(){
		$(document.getElementById('box')).moveBox('right');
	});
});

