(function(){
	'use strict';

	var console = require('./build/console'),
		compiler = require('./build/compiler'),
		minify = require('./build/minify'),
		path = require('path'),
		bootstrapPath = path.join(__dirname, 'node_modules', 'kuba-bootstrap');
		
	// compile less assets
	compiler(bootstrapPath + '/less/kb-all.less', './assets/css/kb-bootstrap.css', bootstrapPath + '/less');
	compiler('./less/dm-index.less', './assets/css/dm-index.css', './less');

	// minify js assets
	minify([
		'./js/dm-index.js', 
		'./js/dm-scroll.js'
		], './assets/js/dm-index.js');

	minify([
		bootstrapPath + '/js/general/kb-base.js',
		bootstrapPath + '/js/general/kb-box-slide.js',
		bootstrapPath + '/js/general/kb-button.js',
		bootstrapPath + '/js/general/kb-ease-slide-double.js',
		bootstrapPath + '/js/general/kb-ease-slide.js',
		bootstrapPath + '/js/general/kb-menu.js',
		bootstrapPath + '/js/general/kb-modal.js',
		bootstrapPath + '/js/general/kb-navigation.js',
		bootstrapPath + '/js/general/kb-simple-carousel.js',
		// bootstrapPath + '/js/general/kb-slide-over.js',
		bootstrapPath + '/js/general/kb-swipe.js',
		bootstrapPath + '/js/general/kb-transition.js'
		], './assets/js/kb-bootstrap.js');

})();