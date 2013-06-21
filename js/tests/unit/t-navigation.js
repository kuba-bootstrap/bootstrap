/*
 * --
 */

$(function(){

	module("kb-navigation");

	test('externalized in jquery object', function(){

		ok($.fn.navigation, 'navigation method is defined');

	});

	test('should be defined on jquery object', function(){

		ok($(document.body).navigation, 'navigation method is defined');
		
	});

	test('should return element', function(){

		ok($(document.body).navigation()[0] == document.body, 'navigation - document.body returned');

	});

});