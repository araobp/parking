var eddystoneBeacon = require('eddystone-beacon/index');
var util = require('./util.js');
const IFNAME = 'wlan0';

address = util.getLocalAddress(IFNAME)[0];
eddystoneBeacon.advertiseUrl('http://' + address + '/');
