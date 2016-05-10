var cassandra = require('cassandra-driver')
var client = new cassandra.Client({ contactPoints: ['localhost']});

client.execute('select * from lpn.lpn', function(err, result) {
  if (err) throw err;
    console.log(result.rows[0]);
});
