var SPI = require('spi');

var spi = new SPI.Spi('/dev/spidev0.0', {
  'mode': SPI.MODE['MODE_0'],  // always set mode as the first option 
  'chipSelect': SPI.CS['none'] // 'none', 'high' - defaults to low 
}, function(s){s.open();});

// MCP3008 AD converter data sheet
// https://cdn-shop.adafruit.com/datasheets/MCP3008.pdf
var txbuf = new Buffer([0x01, 0x80, 0x00]);
var rxbuf = new Buffer([0x00, 0x00, 0x00]);

spi.transfer(txbuf, rxbuf, function(device, buf) {
  //console.log(buf);
  var result = ((buf[1]&3)<<8) + buf[2];
  var volt = result * 3.3 / 1023.0;
  //console.log(volt)
  var temp = (volt*1000.0-500.0)/10.0
  console.log('Temperature: ' + temp);
});
  




