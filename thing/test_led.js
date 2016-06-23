var led = require('./led.js');

led.init();
//led.blink('blue');
led.blink('red');
setTimeout(function() {
  led.end();
}, 200);

