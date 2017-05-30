#!/usr/bin/env node
var request = require('request');
var express = require('express');
var cors = require('cors');
var parseUrl = require('url-parse');
var jqFilter = require('./jq-filter');

var JQFilterFeed = function JQFilterFeed(config) {
    var url = config.url;
    var port = config.port;
    var jq = config.jq;

    var host = parseUrl(url).host;

    var app = express();
    app.use(cors());

    app.get('/', function (req, resp) {
      request.get({
        'url': url
      }, function(error, response, body) {
        if (!error) {
          jqFilter(jq, body)
          .then(function(result) {
            resp.json(result);
          })
          .catch(function(error) {
            console.log(error);
            resp.status(500).send('Could not filter response');
          })
        } else {
          console.log(error);
          resp.status(500).send('Could not request data from url');
        }
      });
    })

    app.listen(port, function () {
      console.log('JQFilterFeed listening at http://localhost:' + port + '/ Press ^C to quit.');
    })

    return this;
};

module.exports = JQFilterFeed;
