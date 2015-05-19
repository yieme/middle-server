/** Middleware server
 *
 *  @copyright  Copyright (C) 2015 by Yieme
 *  @module     middle-server
 */
 (function() {
  'use strict';
  var MiddleServerError = require('make-error')('MiddleServerError')

  /** Middle server
   *  @class
   *  @param      {object} options - The options
   *  @return     {object}
   */
  function middleServerClass(options) {
    /*jshint validthis: true */
    var self = this
    options = options || {}
    self.value = options
    return self
  }



  /** Middle server
   *  @constructor
   *  @param      {object} options - The options
   *  @return     {object}
   */
  function middleServer(options) {
    return new middleServerClass(options).value
  }


  module.exports = middleServer
})();
