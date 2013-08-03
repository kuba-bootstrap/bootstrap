(function(){ 

	var colors = require('colors');

	module.exports = function(type, message){

		switch(type){
			case 'e':
				console.log('   error -'.red, message);
				break;
			case 'w':
				console.log('   warn  -'.magenta, message);
				break;
			case 'i':
				console.log('   info  -'.cyan, message);
				break;
			case 'd':
				console.log('   debug -'.grey, message);
				break;
			case 'de':
				console.log('   dev   -'.green, message);
				break;
			case 'wtf':
				console.log('   wtf?  -'.red, message + ' \n \n   note: you fucked up, remember to breathe then check your shit! \n');
				break;
		}
	};

})();