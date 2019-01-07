var wol = require('node-wol');

const wake = function(MAC){
	wol.wake(MAC, function(error) {
	  if(error) {
	    // handle error
	    return error;
	  }
	});
}

module.exports.wake = wake;