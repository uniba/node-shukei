'use strict';

const request = require('./request');
const StatsMatrix = require('./stats_matrix');
const moment = require('moment');

class Stat {
  constructor(req, from, till, opts) {
    this.from = from;
    this.till = till;
    this.opts = Object.assign({}, { unit: 'day', raw: false }, opts);
    this.req = req;
  }

  activity(id) {
    const url = id ? `api/activities/${id}/events/stats` : `api/activities/events/stats`;
    const query = { from: this.from, till: this.till };
    query.unit = this.opts.unit;
    return this.req(url, query).then(genRes.bind(null, this.opts));
  }

  user(id) {
    const url = id ? `api/users/${id}/events/stats` : `api/users/events/stats`;
    const query = { from: this.from, till: this.till };
    query.unit = this.opts.unit;
    return this.req(url, query).then(genRes.bind(null, this.opts));
  }
}

function format(obj) {
  return moment(obj).format('YYYY-MM-DD');
}

function genRes(opts, data) {
  return opts.raw ? data : new StatsMatrix(data);
}

module.exports = function(url) {
  return function(from, till, opts) {
    return new Stat(request(url), format(from), format(till), opts);
  };
};
