'use strict';

const request = require('./request');
const moment = require('moment');

class Stat {
  constructor(req, from, till, opts) {
    this.from = from;
    this.till = till;
    this.opts = Object.assign({}, { unit: 'day' }, opts);
    this.req = req;
  }

  activity(id) {
    const url = id ? `api/activities/${id}/events/stats` : `api/activities/events/stats`;
    const query = { from: this.from, till: this.till };
    query.unit = this.opts.unit;
    return this.req(url, query);
  }

  user(id) {
    const url = id ? `api/users/${id}/events/stats` : `api/users/events/stats`;
    const query = { from: this.from, till: this.till };
    query.unit = this.opts.unit;
    return this.req(url, query);
  }
}

function format(obj) {
  return moment(obj).format('YYYY-MM-DD');
}

module.exports = function(url) {
  return function(from, till, opts) {
    return new Stat(request(url), format(from), format(till), opts);
  };
};
