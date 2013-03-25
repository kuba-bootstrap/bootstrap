(function(){

	$('#menu').click(function(){
		console.log('c');
		rotate(360);
	});
	$('#menu_2').click(function(){
		console.log('c');
		rotate(45);
	});
	$('#menu_3').click(function(){
		console.log('c');
		rotate(135);
	});
	$('#menu_4').click(function(){
		console.log('c');
		rotate(-45);
	});
	$('#menu_5').click(function(){
		console.log('c');
		rotate(180);
	});
	$('#other').click(function(){
		console.log('o');
		$('#menu_other').addClass('mn-off');
		$('#menu_other_2').removeClass('mn-off');
		rotate(90);
		$('#con').css({'top': '30%'});
	});

	$('#menu_6').click(function(){
		console.log('c');
		rotate(360);
	});
	$('#menu_7').click(function(){
		console.log('c');
		rotate(45);
	});
	$('#menu_8').click(function(){
		console.log('c');
		rotate(135);
	});
	$('#menu_9').click(function(){
		console.log('c');
		rotate(-45);
	});
	$('#menu_10').click(function(){
		console.log('c');
		rotate(180);
	});
	$('#other_2').click(function(){
		console.log('o');
		$('#menu_other_2').addClass('mn-off');
		$('#menu_other').removeClass('mn-off');
		rotate(270);
		$('#con').css({'top': '30%'});
	});

	function rotate(angle){
		$('#con').css({
			'top': '50%',
			'transform': 'rotate(' + angle + 'deg)',
			'-ms-transform': 'rotate(' + angle + 'deg)',
			'-moz-transform': 'rotate(' + angle + 'deg)',
			'-webkit-transform': 'rotate(' + angle + 'deg)',
			'-o-transform': 'rotate(' + angle + 'deg)'
		});
	}

})();