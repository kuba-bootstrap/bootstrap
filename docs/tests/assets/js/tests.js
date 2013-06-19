/*
 * -- Base
 */

// -- This test checks that the various mouse/touch events are being initialized
// -- and that the format of the events have spaces at the end (this is important for
// -- the backbone custom events).

test('base - events', function(){

	ok(downEvent == 'mousedown ' || downEvent == 'touchstart ', 'passed down event');
	ok(upEvent == 'mouseup ' || upEvent == 'touchend ', 'passed up event');
	ok(moveEvent == 'mousemove ' || moveEvent == 'touchmove ', 'passed move event');

});

//
// -- Swipe
//

// test('swipe.js test', function(){

// 	var pon = $('#pon');

// 	pon.swipe();

// 	console.log(pon);

// 	ok('', '', 'passed');

// });

/*
 * -- Buttons
 */

// -- These tests are designed to determine if an appropriate class was added based 
// -- on the mouse state over the control (important for various css attributes).

asyncTest( "button - down", function() {
  
  	var button = $('#button-down-test');
 
  	button.on(downEvent, function(e) {
    	ok(e.target.className == 'btn hvr', 'passed');
    	start();
  	});

	button.trigger('mousedown');

});

asyncTest( "button - up", function() {
  
  	var button = $('#button-up-test');
 
  	button.on(upEvent, function(e) {
    	ok(e.target.className == 'btn', 'passed');
    	start();
  	});

	button.trigger('mouseup');

});

asyncTest( "toggle - down", function() {
  
  	var toggle = $('#toggle-down-test');
 
  	toggle.on(downEvent, function(e){
  		ok(e.target.className == 'tog on', 'passed');
  		start();
	});

	toggle.trigger('mousedown');

});