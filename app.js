var express = require('express');
var app = express();
var fs = require('fs');

/*** You use either Cassandra or MongoDB ***/
//var db = require('./cassandra.js');
var db = require('./mongodb.js');

app.get('/', function(req, res) {
  console.log('GET /')
  fs.readFile(__dirname + '/index.html', 'utf-8', function(err, data) {
    if(err) {
      res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write('Not found');
      } else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
      }
        res.end();
      });
});

app.get('/search', function(req, res) {
  console.log('GET /search')
  var num = req.query.num;
  console.log(num);
  var record = 'Not Found';
  db.searchCar(num, function(record) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(JSON.stringify(record));
    res.end();
  });
});

app.listen(80, function() {
  console.log('Running...');
});
