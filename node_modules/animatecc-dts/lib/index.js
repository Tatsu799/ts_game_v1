module.exports = {};

var formatter = require('./formatter');
module.exports.formatter = formatter;

var model = require('./model');
module.exports.model = model;

var parseJs = require('./parse-js');
module.exports.parseJs = parseJs;

module.exports.generate = function(data)
{
  var jsp = parseJs;
  var ast = jsp.parse(data);

  var builder = model;
  var model = builder.parse(ast[1]);

  return formatter(model);
}
