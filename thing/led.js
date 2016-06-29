/*
 * Circuit
 *
 * GPIO 5 (3.3v)          GND
 *   |                     |
 *   |                     |
 *   +-- LED -- resister --+
 *       blue    1k ohm
 *               
 * GPIO 6 (3.3v)          GND
 *   |                     |
 *   |                     |
 *   +-- LED -- resister --+
 *       red     1k ohm
 */

var fs = require('fs');

const TIMEOUT = 50;  // 50mec
const GPIO_BLUE = 5; // GPIO 5 
const GPIO_RED = 6; // GPIO 6 
const GPIO_OUT_BLUE = 'gpio' + String(GPIO_BLUE);
const GPIO_OUT_RED = 'gpio' + String(GPIO_RED);

// initializes GPIO
exports.init = function() {
  try {
    fs.writeFileSync('/sys/class/gpio/unexport', GPIO_BLUE);
    fs.writeFileSync('/sys/class/gpio/unexport', GPIO_RED);
  } catch (err) {
    // pass
  }
  fs.writeFileSync('/sys/class/gpio/export', GPIO_BLUE);
  fs.writeFileSync('/sys/class/gpio/' + GPIO_OUT_BLUE + '/direction', 'out');
  fs.writeFileSync('/sys/class/gpio/export', GPIO_RED);
  fs.writeFileSync('/sys/class/gpio/' + GPIO_OUT_RED + '/direction', 'out');
}

// makes the LED blink
exports.blink = function(color) {
  if (color == 'blue') {
    fs.writeFileSync('/sys/class/gpio/' + GPIO_OUT_BLUE + '/value', 1);
    setTimeout(function() {
      fs.writeFileSync('/sys/class/gpio/' + GPIO_OUT_BLUE + '/value', 0);
    }, TIMEOUT);
  } else {
    fs.writeFileSync('/sys/class/gpio/' + GPIO_OUT_RED + '/value', 1);
    setTimeout(function() {
      fs.writeFileSync('/sys/class/gpio/' + GPIO_OUT_RED + '/value', 0);
    }, TIMEOUT);
  }
}

exports.end = function() {
  fs.writeFileSync('/sys/class/gpio/unexport', GPIO_BLUE);
  fs.writeFileSync('/sys/class/gpio/unexport', GPIO_RED);
}
