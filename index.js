/** Middleware server
*
*  @copyright  Copyright (C) 2015 by Yieme
*  @module     middle-server
 */
'use strict';
var fs = require('fs')
var express     = require('express')
var app         = express()
var port        = process.env.port || 3000
var path        = require('path')
var pkgPath     = path.normalize(process.cwd() + '/package.json')
var pack        = JSON.parse(fs.readFileSync(pkgPath, 'utf8'))
var logger      = {
  info:  function(msg) { console.log('info:', msg) },
  debug: function(msg) { console.log('debug:', msg) },
  warn:  function(msg) { console.warn('warn:', msg) },
  error: function(msg) { console.error('error:', msg) },
  log:   console.log,
}

function middleServer(options) {
  if ('function' === typeof options) options = { middleware: options }
  options                    = options || {}
  if (options.logger) logger = options.logger
  if (options.port)   port   = options.port

  function consoleLog(req, res, next) {
    logger.info(req.url)
    next()
  }

  function ignoreFavicon(req, res, next) {
    if (req.url == '/favicon.ico') return res.status(404) // ignore favicon
    next()
  }

  options.pre        = options.pre        || []
  if (options.pre.length == 0) {
    options.pre.push(consoleLog)
    options.pre.push(ignoreFavicon)
  }
  options.middleware = options.middleware || require('readme-middleware')
  options.post       = options.post       || []

  for (var i=0, len = options.pre.length; i < len; i++) {
    app.use(options.pre[i])
  }

  app.use(options.middleware)
  for (i=0, len = options.post.length; i < len; i++) {
    app.use(options.post[i])
  }
  var appName = pack.name + '@' + pack.version

  app.listen(port)
  logger.info(appName + ' listening on ' + port)
  return app
}



module.exports = middleServer
