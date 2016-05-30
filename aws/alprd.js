var fs = require('fs');
var ini = require('ini');
var exec = require('child_process').exec;
var ps = require('ps-node');

const ALPRD_CONF = '/etc/openalpr/alprd.conf';
const OPENALPR_CONF = '/etc/openalpr/openalpr.conf';
const ALPRD_CONF_TMP = '/tmp/alprd.conf';
const OPENALPR_CONF_TMP = '/tmp/openalpr.conf';

var config = ini.parse(fs.readFileSync(ALPRD_CONF, 'utf-8'));
fs.createReadStream(OPENALPR_CONF).pipe(fs.createWriteStream(OPENALPR_CONF_TMP));

// launches alprd
exports.launch = function(site_id) {
  config.daemon.site_id = site_id;
  fs.writeFileSync(ALPRD_CONF_TMP, ini.stringify(config));
  var cmd = 'sudo /usr/bin/alprd -l /tmp/alprd.log --config /tmp';
  exec(cmd, function(err, stdout, stderr) {
    if (err) {
      throw new Error(err);
    }
  });
}
// restarts alprd
exports.restart = function(site_id) {
  config.daemon.site_id = site_id;
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
