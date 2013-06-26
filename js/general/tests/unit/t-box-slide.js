/*
 * --
 */

$(function(){

	module("kb-box-slide");

	test('externalized in jquery object', function(){

		ok($.fn.box, 'box method is defined');
		ok($.fn.initialize, 'initialize method is defined');
		ok($.fn.addBox, 'addBox method is defined');
		ok($.fn.moveBox, 'moveBox method is defined');

	});

	test('should be defined on jquery object', function(){

		ok($(document.body).box, 'box method is defined');
		ok($(document.body).initialize, 'initialize method is defined');
		ok($(document.body).addBox, 'addBox method is defined');
		ok($(document.body).moveBox, 'moveBox method is defined');

	});

	test('should return element', function(){

		ok($(document.body).box()[0] == document.body, 'box - document.body returned');
		ok($(document.body).initialize()[0] == document.body, 'initialize - document.body returned');
		ok($(document.body).addBox()[0] == document.body, 'addBox - document.body returned');
		ok($(document.body).moveBox()[0] == document.body, 'moveBox - document.body returned');

	});

});