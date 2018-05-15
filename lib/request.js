'use strict';

const request = require('superagent');
const resolve = require('url').resolve;
const Matrix = require('./stats_matrix');
const log = require('debug')('shukei');

module.exports = function(url) {
  return function(entryPoint, query) {
    const absUrl = resolve(url, '/' + entryPoint);
    log('url = %s, query = %o', absUrl, query);
    const req = request(absUrl).query(query);
    return new Promise((resolve, reject) => {
      req.end((err, res) => {
        if (err || !res.ok) {
          reject(err || new Error('something wrong occured'));
        } else {
          resolve(res.body);
        }
      });
    });
  };
};
