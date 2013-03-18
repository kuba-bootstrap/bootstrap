// NOTE: Please do not use, scrolling is not very well supported on devices

$(function(){
	"use strict";

	// TODO: the scrolling is very weak on a tablet, find another event system.

	var nav = $(document.getElementById('sideNavigation')), 
		navY = nav.position().top - 70,
		win = $(window);

	$(window).on('touchmove', updateStatic).on('touchstart', updateStatic).on('touchend', updateStatic).on('scroll', updateStatic);

	function updateStatic(){
		var width = nav.width();

		if(win.scrollTop() >= navY){
			nav.addClass('afx-top').css('width', width);	
		}else{
			nav.removeClass('afx-top');
		}	
	}
});