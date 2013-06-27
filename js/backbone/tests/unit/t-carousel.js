/*
 * --
 */ 

$(function(){

	module('kb-bb-carousel');

	test('externalized in window', function(){

		ok(window.Carousel, 'dropdown method is externalized');

	});

	var carousel = Carousel.extend({});

	test('carousel declarations - no parameters', function(){

		ok(carousel, 'carousel extended');

		var c = new carousel();

		ok(c, 'carousel declared');
		ok(c.el.tagName == 'DIV', 'carousel tag name');
		ok(c.el.className == 'cr', 'carousel class name');
		ok(c.parentEl == '#body', 'carousel parent object');
		ok(c.distance == 1, 'carousel distance');
		ok(c.dots == '', 'carousel dots');
		ok(c.limit == -1, 'carousel limit');
		ok(c.pointer == 0, 'carousel pointer');
		ok(c.slider[0] == undefined, 'carousel slider');

	});

	test('carousel declarations - with parameters', function(){

		var c = new carousel({parentEl: '#parent', dots: ['#dot1', '#dot2', '#dot3'], slider: '#slider', distance: 100, swipe: true});

		ok(c, 'dropdown declared');
		ok(c.el.tagName == 'DIV', 'carousel tag name');
		ok(c.el.className == 'cr', 'carousel class name');
		ok(c.parentEl == '#parent', 'carousel parent object');
		ok(c.distance == 100, 'carousel distance');
		ok(c.dots.length ==  3, 'carousel dots');
		ok(c.limit == 2, 'carousel limit');
		ok(c.pointer == 0, 'carousel pointer');
		ok(c.slider[0] == undefined, 'carousel slider');

	});

});