var ini = require('ini');
var fs = require('fs');

const STATE_CONF = './state.conf';

var conf = ini.parse(fs.readFileSync(STATE_CONF, 'utf-8'));

// gets state.conf
exports.get = function() {
  return conf;
}

// updates state.conf
exports.update = function(state) {
  if ('site_id' in state) {
    conf.site_id = state.site_id;
  }
  if ('url' in state) {
    conf.url = state.url;
  }
  fs.writeFileSync(STATE_CONF, ini.stringify(conf));
}
