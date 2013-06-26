/*
 * --
 */

$(function(){

	module("kb-bb-dropdown");

	test('externalized in window', function(){

		ok(window.Dropdown, 'dropdown method is defined');

	});

	var dropdown = Dropdown.extend({});

	test('dropdown declarations - no parameters', function(){

		ok(dropdown, 'dropdown extended');

		var dd = new dropdown();

		ok(dd, 'dropdown declared');
		ok(dd.el.tagName == 'UL', 'dropdown tag name');
		ok(dd.el.className == 'dd', 'dropdown class name');
		ok(dd.parentEl == '#body', 'dropdown parent object');

	});

	var model = Backbone.Model.extend({item: ''}),
	    item_1 = new model({item: 'item 1'}),
		item_2 = new model({item: 'item 2'}),
		item_3 = new model({item: 'item 3'}),
	    collection = Backbone.Collection.extend({model: model}),
		items = new collection([item_1, item_2, item_3]);

	test('dropdown declarations - with parameters', function(){

		var dd = new dropdown({parentEl: '#parent', buttons: ['#button1', '#button2', '#button3'], items: items});

		ok(dd, 'dropdown declared');
		ok(dd.el.tagName == 'UL', 'dropdown tag name');
		ok(dd.el.className == 'dd', 'dropdown class name');
		ok(dd.parentEl == '#parent', 'dropdown parent object');
		ok(dd.el.innerHTML == '<li>item 1</li><li>item 2</li><li>item 3</li>', 'dropdown constructed list');

	});

});