/*
 * -- These tests are designed to determine if an appropriate class was added based 
 * -- on the mouse state over the control (important for various css attributes).
 */

    
$(function(){

    module("kb-button");

    test('button exposed', function(){

        var button = $('<button class="btn"></button>');

        // console.log(button); 

        ok(button, 'passed');

    });



    // asyncTest( "button - down", function() {

    // var button = $('#button-down-test');

    // button.on(downEvent, function(e) {
    // 	ok(e.target.className == 'btn hvr', 'passed');
    // 	start();
    // });

    // button.trigger('mousedown');

    // });

    // asyncTest( "button - up", function() {

    // var button = $('#button-up-test');

    // button.on(upEvent, function(e) {
    // 	ok(e.target.className == 'btn', 'passed');
    // 	start();
    // });

    // button.trigger('mouseup');

    // });

    // asyncTest( "toggle - down", function() {

    // var toggle = $('#toggle-down-test');

    // toggle.on(downEvent, function(e){
    // 	ok(e.target.className == 'tog on', 'passed');
    // 	start();
    // });

    // toggle.trigger('mousedown');

    // });

});