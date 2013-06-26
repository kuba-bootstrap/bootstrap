/*
 * --
 */

$(function(){

	module("kb-simple-carousel");

	test('externalized in jquery object', function(){

		ok($.fn.simpleCarousel, 'simpleCarousel method is defined');
		ok($.fn.simpleCarouselMove, 'simpleCarouselMove method is defined');

	});

	test('should be defined on jquery object', function(){

		ok($(document.body).simpleCarousel, 'simpleCarousel method is defined');
		ok($(document.body).simpleCarouselMove, 'simpleCarouselMove method is defined');
		
	});

	test('should return element', function(){

		ok($(document.body).simpleCarousel()[0] == document.body, 'simpleCarousel - document.body returned');
		ok($(document.body).simpleCarouselMove()[0] == document.body, 'simpleCarouselMove - document.body returned');

	});

});