var jq = require('node-jq');

var jqFilter = function(query, data) {
  return jq.run(query, data, {'input': 'json'});
}

module.exports = jqFilter;
