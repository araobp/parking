var thingShadow = require('../../aws-iot-device-sdk-js/').thingShadow;
var isUndefined = require('../../aws-iot-device-sdk-js/common/lib/is-undefined');
var cmdLineProcess = require('../../aws-iot-device-sdk-js/examples/lib/cmdline');

var alprd = require('./alprd.js');

function processTest(args) {

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

   thingShadows.get(args.thingName);

   thingShadows
      .on('status', function(thingName, stat, clientToken, stateObject) {
         var delta = stateObject.state.delta;
         var site_id;
         if (typeof delta == 'undefined') {
           console.log('status w/o delta');
           site_id = stateObject.state.reported.site_id;
         } else {
           site_id = delta.site_id;
           console.log('received delta: ' + site_id);
           thingShadows.update(thingName, {
              state: {
                 reported: stateObject.state
              }
           });
         }
         alprd.launch(site_id);
         handleDelta(thingShadows);
      });

   thingShadows
      .on('error', function(error) {
         console.log('error', error);
      });


   thingShadows
      .on('timeout', function(thingName, clientToken) {
         console.warn('timeout: ' + thingName + ', clientToken=' + clientToken);
      });
}

function handleDelta(thingShadows) {
   thingShadows
      .on('delta', function(thingName, stateObject) {
         console.log('received delta on ' + thingName + ': ' +
            JSON.stringify(stateObject));
         thingShadows.update(thingName, {
            state: {
               reported: stateObject.state
            }
         });
         // Device config 
         var site_id = stateObject.state.site_id;
         console.log(site_id);
         alprd.kill();
         alprd.launch(site_id);
      });
}

module.exports = cmdLineProcess;

if (require.main === module) {
   cmdLineProcess('connect to the AWS IoT service and perform thing shadow echo',
      process.argv.slice(2), processTest, ' ', true);
}


