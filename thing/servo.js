/*
 * Circuit
 *
 *  GND    5V  GPIO21(PWM)
 *   |     |     | 
 *   |     |     |
 *  ++-----+-----++
 *  |  SG90       |
 *  +-------------+
 *         |
 *    -----+ arm
 *
 * You have to run the following command before using this script:
 *
 * $ sudo ./pi-blaster -g 21
 */

var exec = require('child_process').exec;

const GPIO = 21; // GPIO 21 

/**
 * frequency: 50Hz
 * 
 * PWM
 * degree      duty cycle
 * ----------------------
 *    -90      0.025%
 *      0      0.075%
 *    +90      0.125%
 */
exports.rotate = function(angle) {
  var duty = 0.075 + angle/90*0.05;
  var cmd = GPIO + '=' + String(duty);
  //console.log(cmd);
  exec('echo ' + cmd + ' > /dev/pi-blaster');
}
