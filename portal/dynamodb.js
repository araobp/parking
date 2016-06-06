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
    var lastItem = items[items.length - 1];
    //console.log(JSON.stringify(lastItem));
    var site_id = lastItem.payload.M.site_id.S;
    var confidence = lastItem.payload.M.confidence.N;
    var timestamp = lastItem.Timestamp.S;
    var record = {floor_id: site_id, confidence: confidence, timestamp: timestamp};
    console.log(JSON.stringify(record));
    console.log('The car(' + CarId + ') is on ' + site_id);
    fn(record);
  });
}
