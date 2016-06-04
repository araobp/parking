var ini = require('ini');
var fs = require('fs');

const STATE_CONF = './state.conf';

var state = ini.parse(fs.readFileSync(STATE_CONF, 'utf-8'));

// gets state.conf
exports.get = function() {
  return state;
}

// updates state.conf
exports.update = function(delta) {
  if ('site_id' in delta) {
    state.site_id = delta.site_id;
  }
  if ('upload_address' in delta) {
    state.upload_address = delta.upload_address;
  }
  if ('url' in delta) {
    state.url = delta.url;
  }
  fs.writeFileSync(STATE_CONF, ini.stringify(state));
}
