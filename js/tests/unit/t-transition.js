/*
 * --
 */

$(function(){

	module("kb-transition");

	test('externalized in window object', function(){

		ok(window.transition.register, 'register method is defined');
		ok(window.transition.addPage, 'addPage method is defined');
		ok(window.transition.addPageObject, 'addPageObject method is defined');
		ok(window.transition.fadeBack, 'fadeBack method is defined');
		ok(window.transition.fadeNext, 'fadeNext method is defined');
		ok(window.transition.fadeTo, 'fadeTo method is defined');
		ok(window.transition.slideBack, 'slideBack method is defined');
		ok(window.transition.slideNext, 'slideNext method is defined');
		ok(window.transition.slideTo, 'slideTo method is defined');
		ok(window.transition.flipBack, 'flipBack method is defined');
		ok(window.transition.flipNext, 'flipNext method is defined');
		ok(window.transition.flipTo, 'flipTo method is defined');
		ok(window.transition.reset, 'reset method is defined');
		ok(window.transition.move, 'move method is defined');

	});

	test('register page - default', function(){

		var transition = window.transition.register();

		ok(transition, 'register method executed');
		ok(transition.pages, 'pages declared');
		ok(transition.pagesObj, 'pages object declared');
		ok(transition.pointer, 'pointer declared');
		ok(transition.cleanup, 'cleanup declared');

	});

	test('register page - with params', function(){

		var transition = window.transition.register('main', ['page1, page2, page3']);

		ok(transition, 'register method executed');
		ok(transition.pages, 'pages declared');
		ok(transition.pagesObj, 'pages object declared');
		ok(transition.pointer, 'pointer declared');
		ok(transition.cleanup, 'cleanup declared');

	});

});