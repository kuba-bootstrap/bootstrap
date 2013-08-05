(function(){
	'use strict';

	var console = require('./console'),
		fs = require('fs'),
		uglify = require('uglify-js');

	module.exports = function(filenames, output){

		var files = [],
			minify = uglify.minify(filenames);

		filenames.forEach(function(filename){
			var split = filename.split('/'),
            	file = split.pop();

            files.push(file);
		});

		fs.writeFile(output, minify.code, function(err) {
			if(err){ 
				console('e', err);
			} else {
				console('i', 'minified ' + files);
			} 
		});

	};

})();