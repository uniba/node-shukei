'use strict';

const request = require('superagent');
const resolve = require('url').resolve;
const Matrix = require('./stats_matrix');

module.exports = function(url) {
  return function(entryPoint, query) {
    const req = request(resolve(url, '/' + entryPoint)).query(query);
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
