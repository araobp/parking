var fivebeans = require('fivebeans');

var client = new fivebeans.client('127.0.0.1', 11300);
client
    .on('connect', function()
    {
      console.log('connected');
      process(client);
        // client can now be used
    })
    .on('error', function(err)
    {
        // connection failure
    })
    .on('close', function()
    {
        // underlying connection has closed
    })
    .connect();

function loop(client) {
    client.reserve(function(err, jobid, payload) {
      console.log(jobid);
      console.log(payload.toJSON());
      client.destroy(jobid, function(err) {
        if (err) {
          throw err;
        } else {
          loop(client);
        }
      });
    });
}

function process(client) {
  client.watch('alprd', function(err, numwatched) {
    if (err) {
      throw err;
    } else {
      loop(client);
    }
  });
}
