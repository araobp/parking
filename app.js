var config = require('config');
var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var db = require('./cassandra.js');

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
app.use(express.static('angularjs'));

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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/push', function(req, res) {
  console.log('POST /push');
  //console.log(req.body);
  //console.log('AAA--');
  var result = req.body.results[0];
  var plate = result.plate;
  var confidence = result.confidence;
  var processing_time_ms = result.processing_time_ms;
  var site_id = req.body.site_id;
  //console.log('BBB--');
  console.log(plate);
  console.log(confidence);
  console.log(site_id);
  var now = new Date();
  db.save(plate, now, site_id);
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('OK');
  res.end();
});

app.listen(80, function() {
  console.log('Running...');
});
