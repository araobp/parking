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
      //console.log(jobid);
      var data = JSON.parse(payload.toString());
      var result = data.results[0];
      var plate = result.plate;
      var confidence = result.confidence;
      var processing_time_ms = result.processing_time_ms;
      var site_id = data.site_id;
      console.log(plate);
      console.log(confidence);
      console.log(processing_time_ms);
      console.log(site_id);
      client.destroy(jobid, function(err) {
        if (err) {
          throw err;
        } else {
          setTimeout(loop(client), 0);
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
