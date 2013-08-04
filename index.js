(function(){
	'use strict';

	var console = require('./build/console'),
		compiler = require('./build/compiler');
		
	console('i', 'compile less');

	compiler();

	// console('i', 'minify js');

})();