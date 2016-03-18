'use strict';

const assert = require('assert');
const shukei = require('../');
const stat = shukei.stat;
const StatsMatrix = require('../lib/stats_matrix');
const nock = require('nock');
const data = require('./fixtures/data');

describe('stat', () => {
  it('normal', () => {
    const scope = nock('http://sheepy.baaa').get(/.*/).reply(200, data);    
    const api = shukei('http://sheepy.baaa');
    const from = new Date(2016, 2, 14);
    const till = new Date(2016, 2, 21);

    return api.stat(from, till).user('ryo@uniba.jp').then((mat) => {
      assert(mat instanceof StatsMatrix);
    });
  });

  it('unit = week', () => {
    const scope = nock('http://sheepy.baaa').get(/.*/).reply(200, data);    
    const api = shukei('http://sheepy.baaa');
    const from = new Date(2016, 2, 14);
    const till = new Date(2016, 2, 21);

    return api.stat(from, till, { unit: 'week' }).user('ryo@uniba.jp').then((mat) => {
      assert(mat instanceof StatsMatrix);
    });
  });  

  it('invalid host must cause error', () => {
    const scope = nock('http://baaa').get(/.*/).replyWithError('baaa');
    const api = shukei('http://baaa');
    return api.stat('2016-11-03T00:00:00+09:00', '2016-12-03T00:00:00+09:00').user('ryo@uniba.jp').catch((err) => {
      assert(true);
    });
  });
});
