(function(){
	'use strict';

	var console = require('./console'),
		fs = require('fs'),
		path = require('path'),
        bootstrapPath = path.join(__dirname, 'node_modules', 'kuba-bootstrap'),
		less = require('less'),
		parser = new(less.Parser)({
			paths: ['.', './assets/css'], // Specify search paths for @import directives
			filename: 'test.less' // Specify a filename, for better error messages
		});

	module.exports = function(){

		parser.parse('.class { width: 1 + 1; }',function (err, tree) {
			if(err) console('e', err);

			fs.writeFile('./assets/css/kb-all.css', tree.toCSS({ compress: true }), function(err) {
				if(err) console('e', err);
			});
		});

	};

})();