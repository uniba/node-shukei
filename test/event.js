'use strict';

const assert = require('assert');
const shukei = require('../');
const stat = shukei.event;
const nock = require('nock');
const data = require('./fixtures/data');

describe('event', () => {
  it('get single event', () => {
    const scope = nock('http://sheepy.baaa')
            .get('/api/events/123')
            .reply(200, data);

    const api = shukei('http://sheepy.baaa');

    return api.event(123)
      .then(() => {
        assert(true);
      });
  });

  it('list user events', () => {
    const scope = nock('http://sheepy.baaa')
            .get('/api/users/ryo@uniba.jp/events')
            .query({ from: '2016-06-01T00:00:00+09:00', till: '2016-06-30T00:00:00+09:00' })
            .reply(200, data);

    const api = shukei('http://sheepy.baaa');
    const from = new Date(2016, 5, 1);
    const till = new Date(2016, 5, 30);

    return api.events(from, till)
      .user('ryo@uniba.jp')
      .then(() => {
        assert(true);
      });
  });

  it('list activity events', () => {
    const scope = nock('http://sheepy.baaa')
            .get('/api/activities/P6001/events')
            .query({ from: '2016-06-01T00:00:00+09:00', till: '2016-06-30T00:00:00+09:00' })
            .reply(200, data);

    const api = shukei('http://sheepy.baaa');
    const from = new Date(2016, 5, 1);
    const till = new Date(2016, 5, 30);

    return api.events(from, till)
      .activity('P6001')
      .then(() => {
        assert(true);
      });
  });
});
