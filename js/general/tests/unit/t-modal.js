/*
 * --
 */

$(function(){

	module("kb-modal");

	test('externalized in jquery object', function(){

		ok($.fn.modal, 'modal method is defined');
		ok($.fn.closeModal, 'closeModal method is defined');

	});

	test('should be defined on jquery object', function(){

		ok($(document.body).modal, 'modal method is defined');
		ok($(document.body).closeModal, 'closeModal method is defined');

	});

	// test('should return element', function(){

		// find different approach - prevent real rendering

		// ok($(document.body).modal()[0] == document.body, 'modal - document.body returned');
		// ok($(document.body).closeModal()[0] == document.body, 'closeModal - document.body returned');

	// });

});