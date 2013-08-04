(function(){
	'use strict';

	var console = require('./console'),
		fs = require('fs'),
		path = require('path'),
        bootstrapPath = path.join(__dirname + '/../', 'node_modules', 'kuba-bootstrap'),
		less = require('less'),
		parser = new(less.Parser)({
			paths: bootstrapPath + '/less', // Specify search paths for @import directives
			filename: 'kb-all.less' // Specify a filename, for better error messages
		});

	module.exports = function(){

		fs.readFile(bootstrapPath + '/less/kb-all.less', "UTF-8", function (err, content) {
			if(err) console('e', err);

			parser.parse(content, function (err, tree) {
				if(err) console('e', err);

				fs.writeFile('./assets/css/kb-all.css', tree.toCSS({ compress: true }), function(err) {
					if(err) console('e', err);
				});
			});
		});
	};

})();