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
    it('return a row specified by id', () => {
      assert.deepEqual(
        mat.rowAt('ryo@uniba.jp'),
        [
          { header: '2016-02-08T00:00:00+09:00', value: 0 },
          { header: '2016-02-15T00:00:00+09:00', value: 4.1666666865349 },
          { header: '2016-02-22T00:00:00+09:00', value: 0 }
        ]);
    });

    it('return null for unknown id', () => {
      assert.strictEqual(mat.rowAt('baaa'), null);
    });
  });

  describe('#colAt(header)', function() {
    it('a column specified by header', () => {
      assert.deepEqual(
        mat.colAt('2016-02-15T00:00:00+09:00'),
        [
          { rowName: 'ryo@uniba.jp', value: 4.1666666865349 },
          { rowName: 'sei@uniba.jp', value: 3.1666666865349 },
          { rowName: 'seiya@uniba.jp', value: 0.66666668653488 },
          { rowName: 'haruma@uniba.jp', value: 5.7291666865349 },
          { rowName: 'yumi@uniba.jp', value: 20.25 }
        ]);
    });

    it('return null for unknown header', () => {
      assert.strictEqual(mat.colAt('baaa'), null);
    });
  });
});
