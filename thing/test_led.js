var led = require('./led.js');

led.init();
led.blink();
setTimeout(function() {
  led.end();
}, 200);

