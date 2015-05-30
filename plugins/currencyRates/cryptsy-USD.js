var _ = require('lodash');

module.exports.id = 'Cryptsy-USD';
module.exports.url = 'http://pubapi.cryptsy.com/api.php?method=singlemarketdata&marketid=213';

module.exports.parseFn = function(raw) {
  return [{
    code: 'USD',
    rate: parseFloat(raw.return.markets.DRK.lasttradeprice)
  }];
};
