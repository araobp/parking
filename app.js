var express = require('express');
var app = express();
var fs = require('fs');

app.get('/', function(req, res) {
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
  var num = req.query.num;
  console.log(num);
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('3rd floor');
  res.end();
});

app.listen(80, function() {
  console.log('Running...');
});
