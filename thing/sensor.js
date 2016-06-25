require('date-utils');
var led = require('./led.js');
var temperature = require('./temperature.js');

led.init();

const TOPIC = 'sensor';
//const INTERVAL = 5 * 60 * 1000;  // every 5 min
const INTERVAL = 5000;  // every 5 min

exports.startPublishing = function(publisher, thingName, state) {

  var site_id = state.site_id;

  function report(temp) {
      var t = new Date();
      var timestamp = t.getTime().toString();
      var record = {
        timestamp: timestamp,
        thing_name: thingName,
        site_id: state.site_id,
        temperature: temp
      };
      publisher.publish(TOPIC, JSON.stringify(record));
      led.blink('blue'); 
      console.log('temperature: ' + temp);
  }

  setInterval(function() {
    temperature.get(report);
  }, INTERVAL);

}

