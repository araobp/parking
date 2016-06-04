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
    KeyConditions : {
      CarId : {
        ComparisonOperator: 'EQ',
        AttributeValueList: [{S: CarId}]
      }
    }
  };
  client.query(params, function(err, result) {
    if (err) throw err;
    var record = {floor_id: result.Items[0].payload.M.site_id.S};
    console.log(JSON.stringify(record));
    fn(record);
  });
}
