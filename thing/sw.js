/*
 * Circuit
 *
 * GPIO 19 (In)                    3.3V 
 *   |                              |
 *   |                              | 
 *   +-- resister --+--- register --+
 *       1k ohm     |    10k ohm
 *                  o |
 *                    |-|
 *                  o |
 *                  |
 *                 GND
 */

var fs = require('fs');

const GPIO = 19; // GPIO 19 
const GPIO_IN = 'gpio' + String(GPIO);
const HIGH = '1';
const LOW = '0';

const INTERVAL = 100;  // 100msec

// initializes GPIO
exports.init = function() {
  try {
    fs.writeFileSync('/sys/class/gpio/unexport', GPIO);
  } catch (err) {
    // pass
  }
  fs.writeFileSync('/sys/class/gpio/export', GPIO);
  fs.writeFileSync('/sys/class/gpio/' + GPIO_IN + '/direction', 'in');
}

exports.watch = function(listener) {
  var filename = '/sys/class/gpio/' + GPIO_IN + '/value'; 
  var prev = HIGH;
  function loop() {
    var state = fs.readFileSync(filename);
    var value = state.toString().trim();
    if (value != prev) {
      if (value == LOW && prev == HIGH) {
        prev = LOW;
        listener();
      } else if (value == HIGH && prev == LOW) {
        prev = HIGH;
      } 
    }
  };
  setInterval(loop, INTERVAL);
}

exports.end = function() {
  fs.writeFileSync('/sys/class/gpio/unexport', GPIO);
}
