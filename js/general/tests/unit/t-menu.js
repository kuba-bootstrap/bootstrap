/*
 * --
 */

$(function(){

	module("kb-menu");

	test('externalized in jquery object', function(){

		ok($.fn.menu, 'menu method is defined');
		ok($.fn.registerMenu, 'registerMenu method is defined');
		ok($.fn.addMenuItem, 'addMenuItem method is defined');

	});

	test('should be defined on jquery object', function(){

		ok($(document.body).menu, 'menu method is defined');
		ok($(document.body).registerMenu, 'registerMenu method is defined');
		ok($(document.body).addMenuItem, 'addMenuItem method is defined');

	});

	test('should return element', function(){

		ok($(document.body).menu()[0] == document.body, 'menu - document.body returned');
		// ok($(document.body).registerMenu()[0] == document.body, 'registerMenu - document.body returned');
		ok($(document.body).addMenuItem()[0] == document.body, 'addMenuItem - document.body returned');

	});

});