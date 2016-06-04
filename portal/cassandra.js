var cassandra = require('cassandra-driver');
var client = new cassandra.Client({ contactPoints: ['localhost']});

require('date-utils');

var config = require('config');
var expires = config.config.dbExpires;

exports.save = function(license_number, park_time, floor_id) {
  var time = park_time.toFormat('YYYY-MM-DD HH:MI:SS');
  var command = "insert into lpn.lpn ( license_number, park_time, floor_id ) values ( " + license_number + ", '" + time + "' , '" + floor_id + "') using ttl " + expires + ";";
  //console.log(command);
  client.execute(command, function(err, result) {
    if (err) console.log(err); 
  });
};

exports.find = function(license_number, fn) {
  client.execute('select * from lpn.lpn where license_number='+license_number, function(err, result) {
    if (err) throw err;
    //console.log(result.rows[0]);
    record = result.rows[0];
    fn(record);
  })
};
