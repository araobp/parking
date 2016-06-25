var db = require('./dynamodb.js');
db.find('32:9824', function(record) {
  console.log(record);
});


