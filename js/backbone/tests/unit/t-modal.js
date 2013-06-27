/*
 * -
 */

$(function(){

	module('kb-bb-modal');

	test('externalized in window', function(){

		ok(window.Modal, 'modal method is defined');

	});

	var modal = Modal.extend({});

	test('modal declarations - no parameters', function(){

		ok(modal, 'modal extended');

		var m = new modal();

		ok(m, 'modal declared');
		ok(m.el.tagName == 'DIV', 'modal tag name');
		ok(m.el.className == 'mdl', 'modal class name');
		ok(m.parentEl == '#body', 'modal parent object');

	});

	test('modal declarations - with parameters', function(){

		var m = new modal({parentEl: '#parent', button: '#button'});

		ok(m, 'modal declared');
		ok(m.el.tagName == 'DIV', 'modal tag name');
		ok(m.el.className == 'mdl', 'modal class name');
		ok(m.parentEl == '#parent', 'modal parent object');
		ok(m.options.button == '#button', 'modal button')

	});

});