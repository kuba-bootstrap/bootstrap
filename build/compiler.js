(function(){
	'use strict';

	var console = require('./console'),
		fs = require('fs'),
		less = require('less');
		
	module.exports = function(filename, output, paths){

		var split = filename.split("/"),
            file = split.pop(),
			parser = new(less.Parser)({
				paths: paths, // Specify search paths for @import directives
				filename: file // Specify a filename, for better error messages
			});

		fs.readFile(filename, "UTF-8", function (err, content) {
			if(err) console('e', err);

			parser.parse(content, function (err, tree) {
				if(err) console('e', err);

				fs.writeFile(output, tree.toCSS({ compress: true }), function(err) {
					if(err){ 
						console('e', err);
					} else {
						console('i', 'compiled ' + file);
					} 
				});
			});
		});
	};

})();