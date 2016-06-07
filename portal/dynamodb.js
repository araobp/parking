const REGION = 'ap-northeast-1';

var AWS = require('aws-sdk');
var client = new AWS.DynamoDB({region: REGION});

require('date-utils');

var config = require('config');
var expires = config.config.dbExpires;

exports.save = function(license_number, park_time, floor_id) {
  console.log('save function is unsupported');
};

exports.find = function(CarId, fn) {
  var params = {
    TableName: 'ALPR',
    Limit: 5,
    KeyConditions : {
      CarId : {
        ComparisonOperator: 'EQ',
        AttributeValueList: [{S: CarId}]
      }
    }
  };
  client.query(params, function(err, result) {
    if (err) throw err;
    //console.log(JSON.stringify(result));
    var items = result.Items;
    var record = {};
    var confidenceMax = 0;
    var date = new Date();
    date.setDate(date.getDate() - 1);
    var yesterday = date.getTime();
    for (var i = 0; i < items.length; i++ ) {
      var item = items[i];
      var confidence = Number(item.payload.M.confidence.N);
      var timestamp = Number(item.Timestamp.S);
      if (timestamp > yesterday && confidence > confidenceMax) {
        confidenceMax = confidence;
        record.confidence = confidence.toFixed(1);
        record.timestamp = timestamp;
        record.site_id = item.payload.M.site_id.S;
      }
    }
    console.log(JSON.stringify(record));
    console.log('The car(' + CarId + ') is on ' + record.site_id);
    fn(record);
  });
}
