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

	test('easeBodyDouble - function declaration', function(){

		var box = $(document.body).easeBoxDouble();

		console.log(box.data());

		ok(box.data().boxWidth == undefined, 'pass');
		ok(box.data().boxes == undefined, 'pass');
		ok(box.data().boxesPos == undefined, 'pass');
		ok(box.data().distance == undefined, 'pass');
		ok(box.data().dots == undefined, 'pass');
		ok(box.data().force == undefined, 'pass');
		ok(box.data().items == undefined, 'pass');
		ok(box.data().left == undefined, 'pass');
		ok(box.data().lock == undefined, 'pass');
		ok(box.data().offset == undefined, 'pass');
		ok(box.data().offsetX == undefined, 'pass');
		ok(box.data().offsetY == undefined, 'pass');
		ok(box.data().pointer == undefined, 'pass');
		ok(box.data().pointerX == undefined, 'pass');
		ok(box.data().pointerY == undefined, 'pass');
		ok(box.data().rightLimit == undefined, 'pass');
		ok(box.data().scrollParent == undefined, 'pass');
		ok(box.data().scrollSurface == undefined, 'pass');
		ok(box.data().scrollSurfacePos == undefined, 'pass');
		ok(box.data().scrollWidth == undefined, 'pass');
		ok(box.data().single == undefined, 'pass');
		ok(box.data().slider == undefined, 'pass');
		ok(box.data().swipe == undefined, 'pass');
		ok(box.data().width != undefined , 'pass');

	});

	test('should return element', function(){

		ok($(document.body).easeBoxDouble()[0] == document.body, 'easeBoxDouble - document.body returned');
		ok($(document.body).initializeDouble()[0] == document.body, 'initializeDouble - document.body returned');
		ok($(document.body).addEaseBoxDouble()[0] == document.body, 'addEaseBoxDouble - document.body returned');
		ok($(document.body).calculatePosition()[0] == document.body, 'calculatePosition - document.body returned');

	});

});