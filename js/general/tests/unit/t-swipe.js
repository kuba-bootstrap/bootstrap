/*
 * --
 */

$(function(){

	module("kb-swipe");

	test('externalized in jquery object', function(){

		ok($.fn.swipe, 'swipe method is defined');

	});

	test('should be defined on jquery object', function(){

		ok($(document.body).swipe, 'swipe method is defined');

	});

	test('should return element', function(){

		ok($(document.body).swipe()[0], 'document.body returned');

	});

	test('register swipe - with params', function(){

		var swipe = $(document.body).swipe();

		ok(swipe, 'passed');

	});

});