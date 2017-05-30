var jq = require('node-jq');

var jqFilter = function(query, data, input) {
  return jq.run(query, data, {'input': input, 'output': 'json'});
}

module.exports = jqFilter;
