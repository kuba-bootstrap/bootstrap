(function(){
	'use strict';

	var console = require('./build/console'),
		compiler = require('./build/compiler'),
		path = require('path'),
        bootstrapPath = path.join(__dirname, 'node_modules', 'kuba-bootstrap');
		
	console('i', 'compile less');

	compiler(bootstrapPath + '/less/kb-all.less', './assets/css/kb-all.css', bootstrapPath + '/less');
	compiler('./less/dm-index.less', './assets/css/dm-index.css', './less');

	// console('i', 'minify js');

})();