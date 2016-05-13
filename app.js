var config = require('config');
var express = require('express');
var app = express();
var fs = require('fs');

/*** You use either Cassandra or MongoDB ***/
var nosql = config.config.db;
var db = '';
switch (nosql) {
  case 'cassandra':
    db = require('./cassandra');
    break;
  case 'mongodb':
    db = require('./mongodb');
    break;
};

app.use(express.static('www'));

app.get('/search', function(req, res) {
  console.log('GET /search')
  var num = req.query.num;
  //console.log(num);
  var record = 'Not Found';
  db.find(num, function(record) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    //console.log(record);
    if (typeof record == 'undefined') {
      record = { floor_id : '' };
    };
    res.write(JSON.stringify(record));
    res.end();
  });
});

app.listen(80, function() {
  console.log('Running...');
});
