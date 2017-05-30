#!/usr/bin/env node
var JQFilterFeed = require('./server');
var commandLine = require('command-line-args');

var optionsDefinitions = [
  {
    'name': 'url',
    'type': String,
    'description': 'The url of the source json feed',
    'defaultOption': true
  },
  {
    'name': 'port',
    'type': Number,
    'alias': 'p',
    'defaultValue': 3000
  },
  {
    'name': 'jq',
    'type': String,
    'description': 'jq filter to run feed against'
  }
];

var options = commandLine(optionsDefinitions);

if (!options.url) {
  throw new Error('No URL specified!');
}
if (!options.jq) {
  throw new Error('No jq filter specified');
}

var config = {
  url: options.url,
  port: options.port,
  jq: options.jq
}

var server = new JQFilterFeed(config);
