var thingShadow = require('aws-iot-device-sdk').thingShadow;
var isUndefined = require('aws-iot-device-sdk/common/lib/is-undefined');
var cmdLineProcess = require('aws-iot-device-sdk/examples/lib/cmdline');

var conf = require('./conf.js');
var alprd = require('./alprd.js');

var beacon = require('eddystone-beacon/index');

function awsIot(args) {

   /*
   if (isUndefined(args.thingName)) {
      console.log('thing name must be specified with --thing-name');
      process.exit(1);
   }
   */

   var state = conf.get();

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

   console.log('thingName: ' + args.thingName);

   thingShadows.register(args.thingName, {
      persistentSubscribe: true
   });

   beacon.stop();
   beacon.advertiseUrl(state.url);

   thingShadows
      .on('connect', function() {
         alprd.kill();
         alprd.startPublishing(thingShadows, args.thingName);
         alprd.start(state.site_id, state.upload_address);
         console.log('alprd daemon started.');
      });

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
         var delta = stateObject.state;

         // updates alprd-related config and restarts alprd 
         if ('site_id' in delta || 'upload_address' in delta) {
           if ('site_id' in delta) {
             state.site_id = delta.site_id;
             console.log('updating site_id: ' + state.site_id);
           }
           if ('upload_address' in delta) {
             state.upload_address = delta.upload_address;
             console.log('updating upload_address: ' + state.upload_address);
           }
           alprd.kill();
           alprd.start(state.site_id, state.upload_address);
           console.log('alprd daemon restarted.');
         }

         // updates the url advertised by Eddystone
         if ('url' in delta) {
           var url = delta.url;
           state.url = url;
           console.log('updating url: ' + url);
           beacon.stop();
           beacon.advertiseUrl(url);
         }

         // updates the state on state.conf
         conf.update(delta);

         // reports that the delta has been handled by this agent
         thingShadows.update(thingName, {
            state: {
               reported: delta 
            }
         });
   });

}
module.exports = cmdLineProcess;

if (require.main === module) {
   cmdLineProcess('connect to the AWS IoT service',
      process.argv.slice(2), awsIot, ' ', true);
}


