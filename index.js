var jhaml = require('@soyuka/jhaml/lib/Parser')
var through = require('through2')

const ToFunction = {
  start: function start() {
    this.push("module.exports = function() {")
  }
}

const ToJavascript = require('@soyuka/jhaml/lib/engines/Javascript')

ToJavascript.prototype.end = function(cb) {
  this.push(this.currentEngine._javascript)
  this.push('return __html; }')
  cb()
}

module.exports = function(file, opts) {
  if (!/\.haml$/.test(file)) return through()

  let stream = jhaml({engine: [ToFunction, ToJavascript({eval: false})]})

  return stream
}
