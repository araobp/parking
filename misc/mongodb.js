var config = require('config')
var mongoose = require('mongoose');

var expires = config.config.dbExpires

var LpnSchema = new mongoose.Schema({
  license_number: Number, 
  createdAt: Date,
  floor_id: String
});

LpnSchema.index({ "createdAt": 1 }, { expireAfterSeconds: expires });

mongoose.model('Lpn', LpnSchema);

var db = mongoose.connect('mongodb://localhost/lpn');

var Lpn = db.model('Lpn');
var time = new Date();

exports.save = function(license_number, createdAt, floor_id) {
  var record = new Lpn({
    license_number: license_number,
    createdAt, createdAt,
    floor_id: floor_id
  });
  record.save();
};

exports.find = function(license_number, fn) {
  Lpn.find({ license_number: license_number }, function(err, res) {
    fn(res[0]); 
  }).sort( { 'createdAt': -1 });
};
