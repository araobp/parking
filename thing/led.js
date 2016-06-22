/*
 * Circuit
 *
 * GPIO 17                GND
 *   |                     |
 *   |                     |
 *   +-- LED -- resister --+
 */

var fs = require('fs');

const TIMEOUT = 50;  // 50mec
const GPIO_PIN = 17; // Pin 17
const GPIO_OUT = 'gpio' + String(GPIO_PIN); // gpio17

// initializes GPIO
exports.init = function() {
  fs.writeFileSync('/sys/class/gpio/unexport', GPIO_PIN);
  fs.writeFileSync('/sys/class/gpio/export', GPIO_PIN);
  fs.writeFileSync('/sys/class/gpio/' + GPIO_OUT + '/direction', 'out');
}

// makes the LED blink
exports.blink = function() {
  fs.writeFileSync('/sys/class/gpio/' + GPIO_OUT + '/value', 1);
  setTimeout(function() {
    fs.writeFileSync('/sys/class/gpio/' + GPIO_OUT + '/value', 0);
  }, TIMEOUT);
}

exports.end = function() {
  fs.writeFileSync('/sys/class/gpio/unexport', GPIO_PIN);
}
