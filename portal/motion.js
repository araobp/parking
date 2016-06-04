var config = require('config');
var util = require('./util.js');
var db = require('./cassandra.js');
//var db = require('./mongodb.js');

var cars = config.config.cars;

var floor;
var number;
var park_time;

for (var i = 0; i < cars ; i++) {
  floor = util.randInt(4, 8);
  number = util.randInt(1, 9999);
  park_time = new Date();
  db.save(number, park_time, floor + 'th');
  db.find(number, function(res) {
    console.log(res);
  });
}

