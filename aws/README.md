#Thing managment

I use AWS IoT to manage my things remotely.

Attributes to be managed by AWS IoT:
- site_id
- URL emitted by Eddystone(BLE)
- WiFi client parameters
- etc

##Installing AWS IoT SDK for JavaScript

```
$ git clone https://github.com/aws/aws-iot-device-sdk-js.git
$ cd aws-iot-device-sdk-js
$ sudo npm -g install
```

##Test

I updated the shadow on the AWS management console. The agent script received the update via MQTT/TLS.
```
pi@raspberrypi:~/parking/aws $ ./agent.sh
received delta on alpr1: {"timestamp":1463934664,"state":{"site_id":"6th"},"metadata":{"site_id":{"timestamp":1463934664}}}
6th
```
##agent.js

Finally, I have written a code that works as a AWS Shadow client:
```
$ ./agent.sh
```
