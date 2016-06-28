var SPI = require('spi');
var async = require('async');

var spi = new SPI.Spi('/dev/spidev0.0', {
  'mode': SPI.MODE['MODE_0'],  // always set mode as the first option 
  'chipSelect': SPI.CS['none'] // 'none', 'high' - defaults to low 
}, function(s){s.open();});

// MCP3008 AD converter data sheet
// https://cdn-shop.adafruit.com/datasheets/MCP3008.pdf
var txbufCh0 = new Buffer([0x01, 0x80, 0x00]);  // CH0
var txbufCh1 = new Buffer([0x01, 0x90, 0x00]);  // CH1
var rxbuf = new Buffer([0x00, 0x00, 0x00])

// obtains temperature and returns it.
exports.get = function(fn) {
  async.waterfall([
    function(callback) {
      spi.transfer(txbufCh0, rxbuf, function(device, buf) {
        //console.log(buf);
        var result = ((buf[1]&3)<<8) + buf[2];
        var volt = result * 3.3 / 1023.0;
        //console.log(volt)
        var temp = (volt*1000.0-500.0)/10.0;
        //console.log('Temperature: ' + temp);
        callback(undefined, Math.round(temp));
      });
    },
    function(temp, callback) {
      spi.transfer(txbufCh1, rxbuf, function(device, buf) {
        //console.log(buf);
        var result = ((buf[1]&3)<<8) + buf[2];
        var volt = result * 3.3 / 1023.0;
        //register
        var r = (3.3/volt - 1) * 10;  // k ohm
        //console.log('Resister: ' + r);
        var data = {
          temp: temp,
          luminous: Math.round(r) 
        };
        fn(data);
      });
    }
  ]);
}
  
