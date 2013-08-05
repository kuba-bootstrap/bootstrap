(function(){
	'use strict';

	var console = require('./build/console'),
		compiler = require('./build/compiler'),
		minify = require('./build/minify'),
		path = require('path'),
		bootstrapPath = path.join(__dirname, 'node_modules', 'kuba-bootstrap');
		
	// compile less assets
	compiler(bootstrapPath + '/less/kb-all.less', './assets/css/kb-all.css', bootstrapPath + '/less');
	compiler('./less/dm-index.less', './assets/css/dm-index.css', './less');

	// minify js assets
	minify('./js/dm-index.js', './assets/js/dm-index.js');

})();