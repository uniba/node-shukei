'use strict';

const request = require('./request');

module.exports = function(url) {
  return function(id) {
    return request(url)(`api/events/${id}`);
  };
};
