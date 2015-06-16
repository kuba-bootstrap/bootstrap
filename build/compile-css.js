(function(){

	var log = require('./console'),
		fs = require('fs'),
		path = require('path'),
		less = require('less'),
		args = process.argv.slice(2);

	log('i', 'Compiling CSS to ' + args + ' folder');

	fs.readFile('../less/bootstrap.less', function(e, file){
		if(e){
			log('e', 'Reading .less file failed: ' + e);
		} else {
			var file_string = file.toString(),
				options = {
					paths: ['../less'],
					outputDir: args.toString(),
					optimization: 1,
					filename: 'bootstrap.less',
					compress: true,
					yuicompress: true
				};

			log('i', '.less read');

			options.outputfile = options.filename.split(".less")[0] + (options.compress ? ".min" : "") + ".css";
			options.outputDir = path.resolve( process.cwd(), options.outputDir) + "/";
			ensureDirectory(options.outputDir);

			less.render(file_string, options, function(err, output){
				if(err){
					log('e', 'Compilation failed: ' + err);
				} else {
					log('i', '.less compiled');

					fs.writeFile(options.outputDir + options.outputfile, output.css, function(error){
						if(error){
							log('e', 'writing file failed: ' + error);
						} else {
							log('i', 'Compilation complete');
						}
					});
				}
			});
		}
	});

	function ensureDirectory(filepath) {
		var dir = path.dirname(filepath),
			existsSync = fs.existsSync || path.existsSync;
		if (!existsSync(dir)) { fs.mkdirSync(dir); }
	};
	
})();