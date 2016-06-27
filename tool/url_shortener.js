/*
 * This library makes use of Google's URL shortener API.
 * Refer to https://developers.google.com/url-shortener/
 */
var Client = require('node-rest-client').Client;
var fs = require('fs');

var client = new Client();

// Google API key 
var key = fs.readFileSync('../../certs/google.api.key').toString();

var args = {
  data: { longUrl: "http://github.com/araobp/parking" },
  headers: { "Content-Type": "application/json" }
};

exports.shortUrl = function(longUrl, callback) {
  args.data.longUrl = longUrl;
  client.post('https://www.googleapis.com/urlshortener/v1/url?key=' + key,
              args,
              function(data, response) {
                var id = data.id;
                //console.log(id);
                callback(id);
              }
  );
}
            
