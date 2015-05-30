var _ = require('lodash');

module.exports.id = 'Cryptsy-BTC';
module.exports.url = 'http://pubapi.cryptsy.com/api.php?method=singlemarketdata&marketid=155';

module.exports.parseFn = function(raw) {
  return [{
    code: 'BTC',
    rate: parseFloat(raw.return.markets.DRK.lasttradeprice)
  }];
};
