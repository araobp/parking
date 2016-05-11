var search = require('./cassandra.js');
var num = search.searchCar(3453, function(record) {
  console.log(record);
});

