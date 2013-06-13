// NOTE: Please do not use, scrolling is not very well supported on devices

$(function(){
	'use strict';

	// TODO: the scrolling is very weak on a tablet, find another event system.

	var nav = $(document.getElementById('side-nav')),
		pointer = $(document.getElementById('components')), 
		pointerY = pointer.position().top,
		win = $(window);

	win.on(moveEvent, updateStatic);

	function updateStatic(){
		var width = nav.width();

		console.log(win.scrollTop(), pointerY);

		if(win.scrollTop() >= pointerY){
			nav.addClass('afx-top').css('width', '270px');	

			// console.log('add class');
		}else{
			nav.removeClass('afx-top');

			// console.log('remove class');
		}	
	}
});