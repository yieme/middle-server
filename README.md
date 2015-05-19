# middle-server

Middleware server

## Installation

This module is installed via npm:

```sh
npm i middle-server --save
```

## Example Usage

```js
require('middle-server')() // serve README.md
```

Override options
```js
function consoleLog(req, res, next) {
	console.log(req.url)
	next()
}
function ignoreFavicon(req, res, next) {
	if (req.url == '/favicon.ico') return res.status(404) // ignore favicon
	next()
}
var options = {
	pre:        [consoleLog, ignoreFavicon], // middleware to process before primary middleware
	middleware: function(req,res,next) { },  // default primary middleware override
	post:       [],                          // middleware to process after primary middleware
  port:       process.env.port || 3000,    // override the default port
	logger:     yourWinstonInstance,         // override logger, default console supports: debug, info, warn, error, log
}
var app = require('middle-server')(options) // returns instance to the running application server
```

## Rights

Copyright (C) 2015 by yieme, License: MIT
