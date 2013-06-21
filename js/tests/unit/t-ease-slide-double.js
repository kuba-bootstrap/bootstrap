/*
 * --
 */

$(function(){

	module("kb-ease-slide-double");

	test('externalized in jquery object', function(){

		ok($.fn.easeBoxDouble, 'easeBoxDouble method is defined');
		ok($.fn.initializeDouble, 'initializeDouble method is defined');
		ok($.fn.addEaseBoxDouble, 'addEaseBoxDouble method is defined');
		ok($.fn.calculatePosition, 'calculatePosition method is defined');

	});

	test('should be defined on jquery object', function(){

		ok($(document.body).easeBoxDouble, 'easeBoxDouble method is defined');
		ok($(document.body).initializeDouble, 'initializeDouble method is defined');
		ok($(document.body).addEaseBoxDouble, 'addEaseBoxDouble method is defined');
		ok($(document.body).calculatePosition, 'calculatePosition method is defined');

	});

	test('should return element', function(){

		ok($(document.body).easeBoxDouble()[0] == document.body, 'easeBoxDouble - document.body returned');
		// ok($(document.body).initializeDouble()[0] == document.body, 'initializeDouble - document.body returned');
		ok($(document.body).addEaseBoxDouble()[0] == document.body, 'addEaseBoxDouble - document.body returned');
		ok($(document.body).calculatePosition()[0] == document.body, 'calculatePosition - document.body returned');

	});

});