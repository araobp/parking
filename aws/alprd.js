var fs = require('fs');
var ini = require('ini');
var exec = require('child_process').exec;
var ps = require('ps-node');
var fivebeans = require('fivebeans');

const ALPRD_CONF = '/etc/openalpr/alprd.conf';
const OPENALPR_CONF = '/etc/openalpr/openalpr.conf';
const ALPRD_CONF_TMP = '/tmp/alprd.conf';
const OPENALPR_CONF_TMP = '/tmp/openalpr.conf';

const TOPIC = 'alprd';

var config = ini.parse(fs.readFileSync(ALPRD_CONF, 'utf-8'));
fs.createReadStream(OPENALPR_CONF).pipe(fs.createWriteStream(OPENALPR_CONF_TMP));

function processClient(client, publisher) {
  client.watch('alprd', function(err, numwatched) {
    if (err) {
      throw err;
    } else {
      loop(client, publisher);
    }
  });
}

function loop(client, publisher) {
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
    var record = {plate: plate, confidence: confidence, processing_time_ms: processing_time_ms, site_id: site_id};
    publisher.publish(TOPIC, JSON.stringify(record));
    client.destroy(jobid, function(err) {
      if (err) {
        throw err;
      } else {
        setTimeout(loop(client, publisher), 0);
      }
    });
  });
}


exports.startPublishing = function(publisher) {
  this.publisher = publisher;
  console.log(this.publisher);
  client = new fivebeans.client('127.0.0.1', 11300);
  client
    .on('connect', function()
    {
      console.log('connected');
      processClient(client, publisher);
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
}

// launches alprd
exports.start = function(site_id, upload_address) {
  config.daemon.site_id = site_id;
  config.daemon.upload_address = upload_address;
  fs.writeFileSync(ALPRD_CONF_TMP, ini.stringify(config));
  var cmd = 'sudo /usr/bin/alprd -l /tmp/alprd.log --config /tmp';
  exec(cmd, function(err, stdout, stderr) {
    if (err) {
      throw new Error(err);
    }
  });
}

// kills all the running alprd daemons
exports.kill = function() {
  ps.lookup({
    command: 'alprd',
    psargs: 'ax'
  }, function(err, resultList) {
    resultList.forEach(function(process) {
      if (process) {
        ps.kill(process.pid, function(err) {
          if (err) {
            //
          } else {
            console.log('alprd(' + process.pid +') killed');
          }
        });
      }
    });
  });
}
