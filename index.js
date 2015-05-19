/** Middleware server
 *
 *  @copyright  Copyright (C) 2015 by Yieme
 *  @module     middle-server
 */
 (function() {
  'use strict';
  var fs = require('fs')

  function middleServer(options) {
    if ('function' === typeof options) options = { middleware: options }
    options         = options         || process.env
    if (!options.app) options.express = options.express || require('express')
    options.app     = options.app     || options.express()
    var port        = options.port    || 3000
    var pkg         = options.pkg     || fs.readFileSync(process.cwd() + '/package.json', 'utf8')
    var consoleLogger = {
      info:  function(msg) { console.log('info:', msg) },
      debug: function(msg) { console.log('debug:', msg) },
      warn:  function(msg) { console.warn('warn:', msg) },
      error: function(msg) { console.error('error:', msg) },
      log:   console.log,
    }
    var logger      = options.logger  || consoleLogger



    function consoleLog(req, res, next) {
      logger.info(req.url)
      next()
    }

    function ignoreFavicon(req, res, next) {
      if (req.url == '/favicon.ico') return res.status(404) // ignore favicon
      next()
    }

    options.pre        = options.pre        || [consoleLog, ignoreFavicon]
    options.middleware = options.middleware || require('readme-middleware')
    options.post       = options.post       || []

    for (var i=0, len = options.pre.length; i < len; i++) {
      app.use(options.pre[i])
    }

    app.use(options.middleware)
    for (i=0, len = options.post.length; i < len; i++) {
      app.use(options.post[i])
    }

    app.listen(port)
    logger.info(pkg.name + '@' + pkg.version, 'listening on ' + port)
    return app
  }


  module.exports = middleServer
})();
