'use strict';

const request = require('./request');
const format = require('./util').formatDate;

class Events {
  constructor(req, from, till) {
    this.req = req;
    this.from = from;
    this.till = till;
  }

  activity(id) {
    const url = `api/activities/${id}/events`;
    const query = { from: this.from, till: this.till };
    return this.req(url, query);
  }

  user(id) {
    const url = `api/users/${id}/events`;
    const query = { from: this.from, till: this.till };
    return this.req(url, query);
  }
}

module.exports = function(url) {
  return function(from, till) {
    return new Events(request(url), format(from), format(till));
  };
};
