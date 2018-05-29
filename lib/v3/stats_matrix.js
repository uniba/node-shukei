'use strict';

class StatsMatrix {
  constructor(data) {
    this.data = data;
    this.rowIndex = this.buildRowIndex();
    this.colIndex = this.buildColIndex();
  }

  buildRowIndex() {
    const rows = this.data.rows;
    if (rows.length === 0) return {};
    if (rows[0].tag) {
      return rows.reduce((acc, row, i) => {
        acc[row.tag.name] = i;
        return acc;
      }, {});
    } else if (rows[0].user) {
      return rows.reduce((acc, row, i) => {
        acc[row.user.uid] = i;
        return acc;
      }, {});
    } else {
      throw new Error('invalid format');
    }
  }

  buildColIndex() {
    return this.data.headers.reduce((acc, header, i) => { acc[header] = i; return acc; }, {});
  }

  getHeaders() {
    return this.data.headers.slice();
  }

  getRowNames() {
    const rows = this.data.rows;
    if (rows.length === 0) return [];
    if (rows[0].tag) {
      return rows.map((row) => { return row.tag.name; });
    } else if (rows[0].user) {
      return rows.map((row) => { return row.user.uid; });
    } else {
      throw new Error('invalid format');
    }
  }

  eachCol(cb) {
    this.headers.forEach((header, i) => {
      cb(this.colAt(header), i);
    });
  }

  eachRow(cb) {
    this.data.rows.forEach(cb);
  }

  colAt(header) {
    const rowNames = this.getRowNames();
    if (typeof this.colIndex[header] === 'undefined') return null;
    return this.data.rows.map((row, i) => {
      return {
        rowName: rowNames[i],
        value: row.data[this.colIndex[header]].value
      };
    });
  }

  rowAt(id) {
    if (typeof this.rowIndex[id] === 'undefined') return null;
    return this.data.rows[this.rowIndex[id]].data;
  }
}

module.exports = StatsMatrix;
