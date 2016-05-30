var thingShadow = require('aws-iot-device-sdk').thingShadow;
var isUndefined = require('aws-iot-device-sdk/common/lib/is-undefined');
var cmdLineProcess = require('aws-iot-device-sdk/examples/lib/cmdline');

var conf = require('./conf.js');
var alprd = require('./alprd.js');

var beacon = require('eddystone-beacon/index');

function awsIot(args) {

   if (isUndefined(args.thingName)) {
      console.log('thing name must be specified with --thing-name');
      process.exit(1);
   }

   const thingShadows = thingShadow({
      keyPath: args.privateKey,
      certPath: args.clientCert,
      caPath: args.caCert,
      clientId: args.clientId,
      region: args.region,
      baseReconnectTimeMs: args.baseReconnectTimeMs,
      keepalive: args.keepAlive,
      protocol: args.Protocol,
      port: args.Port,
      host: args.Host,
      debug: args.Debug
   });

   thingShadows.register(args.thingName, {
      persistentSubscribe: true
   });

   alprd.kill();
   var state = conf.get();
   alprd.launch(state.site_id);
   console.log('alprd daemon started.');

   beacon.stop();
   beacon.advertiseUrl(state.url);

   thingShadows
      .on('error', function(error) {
         console.log('error', error);
      });


   thingShadows
      .on('timeout', function(thingName, clientToken) {
         console.warn('timeout: ' + thingName + ', clientToken=' + clientToken);
      });

   thingShadows
      .on('delta', function(thingName, stateObject) {
         console.log('received delta on ' + thingName + ': ' +
            JSON.stringify(stateObject));
         var state = stateObject.state;
         thingShadows.update(thingName, {
            state: {
               reported: state
            }
         });
         // Device config 
         if ('site_id' in state) {
           var site_id = state.site_id;
           console.log('updating site_id: ' + site_id);
           alprd.kill();
           alprd.restart(site_id);
           console.log('alprd daemon restarted.');
         }
         if ('url' in state) {
           var url = stateObject.state.url;
           console.log('updating url: ' + url);
           beacon.stop();
           beacon.advertiseUrl(url);
         }
         conf.update(state);
   });

}
module.exports = cmdLineProcess;

if (require.main === module) {
   cmdLineProcess('connect to the AWS IoT service',
      process.argv.slice(2), awsIot, ' ', true);
}


