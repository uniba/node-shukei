'use strict';

const stat = require('./lib/stat');
const request = require('./lib/request');

function shukei(url) {
  // expose api
  return {
    stat: stat(url)
  };
}

module.exports = shukei;
