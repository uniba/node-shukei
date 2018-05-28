'use strict';

const StatsMatrix = require('./stats_matrix');

class StatsMatrices extends Array {
  super(...args) {
    args.forEach((data) => {
      this.push(new StatsMatrix(data));
    });
  }

  // TODO: add collection method.
}

module.exports = StatsMatrices;
