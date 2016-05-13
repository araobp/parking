//var search = require('./cassandra.js');
//var num = search.searchCar(3453, function(record) {
//  console.log(record);
//});

var mongo = require('./mongodb.js');
var park_time = new Date();
mongo.save(9999, park_time, '7th');
mongo.find(9999, function(res) {
  console.log(res);
});

