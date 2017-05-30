#!/usr/bin/env node
var request = require('request');
var express = require('express');
var cors = require('cors');
var parseUrl = require('url-parse');
var jqFilter = require('./jq-filter');
var tmp = require('tmp');
var fs = require('fs');

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
          if (50000 > body.length) {
            jqFilter(jq, body, 'string')
            .then(function(result) {
              resp.json(result);
            })
            .catch(function(error) {
              console.log(error);
              resp.status(500).send('Could not filter response');
            })
          } else {
            tmp.file({'postfix': '.json'}, function(err, path, fd) {
              fs.writeSync(fd, body);
              jqFilter(jq, path, 'file')
              .then(function(result) {
                resp.json(result);
              })
              .catch(function(error) {
                console.log(error);
                resp.status(500).send('Could not filter response');
              })
            });
          }
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
