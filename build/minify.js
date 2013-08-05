(function(){
	'use strict';

	var console = require('./console'),
		fs = require('fs'),
		uglify = require('uglify-js');

	module.exports = function(filename, output){

		var split = filename.split('/'),
            file = split.pop(),
			minify = uglify.minify(filename);

		fs.writeFile(output, minify.code, function(err) {
			if(err){ 
				console('e', err);
			} else {
				console('i', 'compiled ' + file);
			} 
		});

	};

})();