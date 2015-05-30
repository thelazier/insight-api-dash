'use strict';

var config = require('../../config/config');

// Set the initial vars
var timestamp = +new Date(),
    delay = config.currencyRefresh * 60000,
    bitfinexRate = 0,
    cryptsyRate = 0;

exports.index = function(req, res) {

  var _xhr = function() {
    if (typeof XMLHttpRequest !== 'undefined' && XMLHttpRequest !== null) {
      return new XMLHttpRequest();
    } else if (typeof require !== 'undefined' && require !== null) {
      var XMLhttprequest = require('xmlhttprequest').XMLHttpRequest;
      return new XMLhttprequest();
    }
  };

  var _request = function(url, cb) {
    var request;
    request = _xhr();
    request.open('GET', url, true);
    request.onreadystatechange = function() {
      if (request.readyState === 4) {
        if (request.status === 200) {
          return cb(false, request.responseText);
        }

        return cb(true, {
          status: request.status,
          message: 'Request error'
        });
      }
    };

    return request.send(null);
  };

  // Init
  var currentTime = +new Date();
  if (bitfinexRate === 0 || currentTime >= (timestamp + delay)) {
    timestamp = currentTime;

    _request('https://api.bitfinex.com/v1/ticker/drkusd', function(err, data) {
      if (!err) bitfinexRate = parseFloat(JSON.parse(data).last_price);
    });
  }

  if (cryptsyRate === 0 || currentTime >= (timestamp + delay)) {
    timestamp = currentTime;

    _request('http://pubapi.cryptsy.com/api.php?method=singlemarketdata&marketid=213', function(err, data) {
      if (!err) cryptsyRate = parseFloat(JSON.parse(data).return.markets.DRK.lasttradeprice);
    });
  }

  res.jsonp({
    status: 200,
    data: { 
      bitfinex: bitfinexRate,
      cryptsy: cryptsyRate
    }
  });
};
