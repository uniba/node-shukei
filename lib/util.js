const moment = require('moment');

module.exports = {
  formatDate: function(obj) {
    return moment(obj).format();
  }
};
