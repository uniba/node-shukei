'use strict';

const stat = require('./lib/stat');
const event = require('./lib/event');
const events = require('./lib/events');
const request = require('./lib/request');

function shukei(url) {
  // expose api
  return {
    stat: stat(url),
    events: events(url),
    event: event(url)
  };
}

module.exports = shukei;
