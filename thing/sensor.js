require('date-utils');
var led = require('./led.js');
var adc = require('./adc.js');
var sw = require('./sw.js');

led.init();

const TOPIC = 'sensor';
const INTERVAL = 5 * 60 * 1000;  // every 5 min
//const INTERVAL = 5000;  // every 5 sec 

exports.startPublishing = function(publisher, thingName, state) {

  var site_id = state.site_id;

  function report(data) {
      var t = new Date();
      var timestamp = t.getTime().toString();
      var record = {
        timestamp: timestamp,
        thing_name: thingName,
        site_id: site_id,
        temperature: data.temp,
        luminousity: data.luminous
      };
      publisher.publish(TOPIC, JSON.stringify(record));
      led.blink('blue'); 
      console.log('temperature: ' + data.temp);
      console.log('luminousity: ' + data.luminous);
  }

  setInterval(function() {
    adc.get(report);
  }, INTERVAL);

  function listener(mode) {
    if (mode == sw.STIMULUS) {
      adc.get(report);
    }
  }

  sw.watch(listener);
}

