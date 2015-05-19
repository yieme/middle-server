'use strict';

process.on('uncaughtException', function (err) {
  console.log(err);
	process.exit(1)
})

require('./')()
