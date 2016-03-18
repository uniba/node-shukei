'use strict';

const assert = require('assert');
const shukei = require('../');
const stat = shukei.stat;
const StatsMatrix = require('../lib/stats_matrix');
const data = require('./fixtures/data.json');

describe('StatMatrix', () => {
  const mat = new StatsMatrix(data);

  describe('#getHeaders()', () => {
    it('headers', () => {
      assert.deepEqual(mat.getHeaders(), ['2016-02-08T00:00:00+09:00', '2016-02-15T00:00:00+09:00', '2016-02-22T00:00:00+09:00']);
    });
  });

  describe('#getRowNames()', () => {
    it('row names', () => {
      assert.deepEqual(mat.getRowNames(), ['ryo@uniba.jp', 'sei@uniba.jp', 'seiya@uniba.jp', 'haruma@uniba.jp', 'yumi@uniba.jp']);
    });
  });

  describe('#rowAt(id)', function() {
    it('a row specified by id', () => {
      assert.deepEqual(mat.rowAt('ryo@uniba.jp'), [0, 4.1666666865349, 0]);
    });
  });

  describe('#colAt(header)', function() {
    it('a column specified by header', () => {
      assert.deepEqual(mat.colAt('2016-02-15T00:00:00+09:00'), [4.1666666865349, 3.1666666865349, 0.66666668653488, 5.7291666865349, 20.25]);
    });
  });
});
