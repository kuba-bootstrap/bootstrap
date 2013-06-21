/*
 * -- This test checks that the various mouse/touch events are being initialized
 * -- and that the format of the events have spaces at the end (this is important for
 * -- the backbone custom events).
 */

$(function(){

	module("kb-base");

	test('events exposed', function(){

		ok(downEvent != undefined, 'down event exposed');
		ok(upEvent != undefined, 'up event exposed');
		ok(moveEvent != undefined, 'move event exposed');

	});

	test('events initialized', function(){

		ok(downEvent == 'mousedown ' || downEvent == 'touchstart ', 'passed down event');
		ok(upEvent == 'mouseup ' || upEvent == 'touchend ', 'passed up event');
		ok(moveEvent == 'mousemove ' || moveEvent == 'touchmove ', 'passed move event');

	});

});