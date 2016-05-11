var cassandra = require('cassandra-driver')
var client = new cassandra.Client({ contactPoints: ['localhost']});

exports.searchCar = function(license_number, fn) {
  client.execute('select * from lpn.lpn where license_number='+license_number, function(err, result) {
    if (err) throw err;
    console.log(result.rows[0]);
    record = result.rows[0];
    fn(record);
  })
};
