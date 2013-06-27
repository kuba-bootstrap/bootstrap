/*
 * -
 */

$(function(){

	module('kb-bb-slide-over');

	test('externalized in window', function(){

		ok(window.SlideOver, 'slide over method is defined');

	});

	var slideOver = SlideOver.extend({});

	test('slide over declarations - no parameters', function(){

		ok(slideOver, 'slide over extended');

		var so = new slideOver();

		ok(so, 'slide over declared');
		ok(so.el.tagName == 'DIV', 'slide over tag name');
		ok(so.parentEl == '#body', 'slide over parent object');
		// ok(so.slideEl == 'div', 'slide over slide object');
		ok(so.direction == 'left', 'slide over direction');
		ok(so.offset == 80, 'slide over offset');

		console.log(so);

	});

	test('slide over declarations - with parameters', function(){

		var so = new slideOver({parentEl: '#parent', slideEl: '#slide', button: '#button', offset: 100, direction: 'right'});

		ok(so, 'slide over declared');
		ok(so.el.tagName == 'DIV', 'slide over tag name');
		ok(so.parentEl == '#parent', 'slide over parent object');
		ok(so.slideEl == '#slide', 'slide over slide object');
		ok(so.options.button == '#button', 'slide over button');
		ok(so.direction == 'right', 'slide over direction');
		ok(so.offset == 100, 'slide over offset');

	});

});